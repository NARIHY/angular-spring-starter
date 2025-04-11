import { Injectable } from '@angular/core';
import { OidcUser, UserControllerService } from '../rest';
import { RolesEnum } from '../commons/utils/enum/RoleEnum';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { ToastService } from '../commons/utils/toast/toast.service';
import { Router } from '@angular/router';

export interface UserPermissions {
  query: boolean;
  queryOne: boolean;
  create: boolean;
  update: boolean;
  remove: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static readonly xUserAllowedMethods = 'x-user-allowed-methods';

  private static COOKIE_NAME = 'oidc_token';
  private _userBehaviourSubject = new BehaviorSubject<OidcUser>({} as OidcUser);
  private _observableWhoAmI!: Observable<OidcUser>;


  constructor(
    private usersService: UserControllerService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private http: HttpClient,
    private router: Router) {
  }

  get observableWhoAmI(): Observable<OidcUser> {
    if (this.isAuthenticated()) {
      if (!this._observableWhoAmI) {
        this._observableWhoAmI = this.usersService.whoAmI().pipe(shareReplay(1));
      }
    }
    return this._observableWhoAmI;
  }

  get userBehaviourSubject(): BehaviorSubject<OidcUser> {
    return this._userBehaviourSubject;
  }



  public static getUserPermissionsFromHeader(httpHeader: HttpHeaders): UserPermissions {
    const header = httpHeader.get(this.xUserAllowedMethods);

    if (header) {  // Ensure header is not null
      return {
        query: this.havePermission(header, 'GET'),
        queryOne: this.havePermission(header, 'GET_ONE'),
        update: this.havePermission(header, 'UPDATE'),
        remove: this.havePermission(header, 'DELETE'),
        create: this.havePermission(header, 'POST')
      };
    } else {
      return {
        query: false,
        queryOne: false,
        update: false,
        remove: false,
        create: false
      };
    }
  }


  private static havePermission(value: string, reference: string): boolean {
    return value.includes(reference);
  }



  public login() {
    setTimeout(() => {
      window.location.href = environment.serviceUrl + '/login';
    }, 500);
  }

  public logout(login?: boolean): void {
    if (!login) {
      this.logoutLocal(false);
      window.location.href = environment.serviceUrl + '/logout/init';
    } else {
      this.logoutLocal(login);
    }
  }

  public isAuthenticated(): boolean {
    return this.cookieService.check(AuthenticationService.COOKIE_NAME);
  }


  public isAdmin(user: OidcUser): boolean {
    return this.hasRole(user, RolesEnum.ADMIN);
  }

  public isDriver(user: OidcUser): boolean {
    return this.hasRole(user, RolesEnum.DRIVER);
  }

  public isClient(user: OidcUser): boolean {
    return this.hasRole(user, RolesEnum.CLIENT);
  }

  // Utility method to check roles safely
  private hasRole(user: OidcUser, role: RolesEnum): boolean {
    if (!user?.roles) {
      return false; // if clientRoles is undefined or not available
    }
    // Ensure clientRoles is an array
    return Object.values(user.roles).some(roles => roles.includes(role));
  }


  public logoutLocal(login?: boolean) {
    this._userBehaviourSubject.next({} as OidcUser);
    this._observableWhoAmI = this.usersService.whoAmI().pipe(shareReplay(1));
    this.cookieService.deleteAll('/', environment.domain);

    if (login) {
      this.login();
    }
  }

  public logoutToKeycloak(){
    this.router.navigate([environment.serviceUrl + '/logout-init'])
  }

}
