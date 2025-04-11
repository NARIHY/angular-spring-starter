import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { RolesEnum } from '../commons/utils/enum/RoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.isAuthenticated()) {
      return this.auth.observableWhoAmI.pipe(map((user) => {
        this.auth.userBehaviourSubject.next(user);
        const roles = user.roles || [];
        if (Array.from(roles).includes(RolesEnum.CLIENT.toString()) && (!route.url[0] || route.url[0].path !== 'client')) {
          this.router.navigate([{ outlets: { primary: 'client', menu: 'client-menu' } }]);
          return false;
        } else if (Array.from(roles).includes(RolesEnum.ADMIN.toString()) && (!route.url[0] || route.url[0].path !== 'admin')) {
          this.router.navigate([{ outlets: { primary: 'admin', menu: 'admin-menu' } }]);
          return false;
        } else if (Array.from(roles).includes(RolesEnum.DRIVER.toString()) && (!route.url[0] || route.url[0].path !== 'driver')) {
          this.router.navigate([{ outlets: { primary: 'driver', menu: 'driver-menu' } }]);
          return false;
        }
        return true;
      }), catchError(() => this.router.navigate([''])));
    } else if (!route.url[0] || route.url[0].path !== '') {
      this.router.navigate(['']);
      return of(false);
    } else {
      return of(true);
    };
  }

}
