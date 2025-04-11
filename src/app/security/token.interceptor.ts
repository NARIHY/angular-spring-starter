import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError, shareReplay, switchMap, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ToastService } from '../commons/utils/toast/toast.service';
import { CookieService } from 'ngx-cookie-service';
import { LoaderService } from '../commons/utils/loader/loader.service';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private refreshTokenRequest: Observable<any> | null = null;
  private subscriptionTime!: number;
  private refreshAttempts = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastService,
    private cookieService: CookieService,
    private loader: LoaderService,
    private http: HttpClient,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.cookieService.get('oidc_token');
    if (jwt && !request.url.includes('/refresh')) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${jwt}` },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && this.cookieService.get('oidc_token')) {

          if (this.refreshAttempts >= 5) {
            this.authenticationService.logout(true);
            return throwError(() => error);
          }

          const currentTime = Date.now();
          if (!this.refreshTokenRequest || currentTime - this.subscriptionTime > 5000) {
            this.refreshTokenRequest = this.http.post<{ access_token: string; refresh_token: string }>(
              `${environment.serviceUrl}/refresh`,
              { refresh_token: this.cookieService.get('oidc_refresh_token') }
            ).pipe(shareReplay(1));

            this.subscriptionTime = Date.now();
          }

          return this.refreshTokenRequest.pipe(
            switchMap((response) => {
              this.cookieService.delete('oidc_token', '/', environment.domain);
              this.cookieService.delete('oidc_refresh_token', '/', environment.domain);

              this.cookieService.set('oidc_token', response.access_token, 60, '/', environment.domain, true);
              this.cookieService.set('oidc_refresh_token', response.refresh_token, 60, '/', environment.domain, true);

              this.refreshAttempts = 0;
              this.refreshTokenRequest = null;

              return next.handle(
                request.clone({ setHeaders: { Authorization: `Bearer ${response.access_token}` } })
              );
            }),
            catchError((err) => {
              this.refreshTokenRequest = null;
              this.refreshAttempts++;
              this.authenticationService.logout(true);
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      }),
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 418) {
              this.toastService.show({
                icon: faCircleExclamation,
                title: 'Utilisateur Inexistant',
                text: "Vous n'êtes pas inscrit",
              }, { classname: 'bg-danger' });
            } else if (err.status === 403) {
              this.toastService.show({
                icon: faCircleExclamation,
                title: 'Opération non permise',
                text: "Vous n'avez pas les droits pour effectuer cette opération",
              }, { classname: 'bg-danger' });
            } else if (err.status === 405) {
              this.toastService.show({
                icon: faCircleExclamation,
                title: 'Opération non permise',
                text: err.message,
              }, { classname: 'bg-danger' });
            } else if ((err.status === 500 || err.status === 0 || err.status === 504) && this.router.url !== '/breakdown') {
              this.router.navigate(['breakdown']);
              this.loader.stop();
            } else if (err.status === 400) {
              this.toastService.show({
                icon: faCircleExclamation,
                title: 'Une erreur est survenue',
                text: `Veuillez nous contacter si le problème persiste : ${err.error?.details}`,
              }, { classname: 'bg-danger' });
              this.loader.stop();
            }
          }
        }
      })
    );
  }
}
