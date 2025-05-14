import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshRetryCount = 0;
  private readonly MAX_RETRIES = 5;

  constructor(private tokenService: TokenService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getAccessToken();

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error.status === 401 && this.refreshRetryCount < this.MAX_RETRIES) {
            this.refreshRetryCount++;
            return this.refreshTokenAndRetry(req, next);
          }
          this.refreshRetryCount = 0;
          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }

  private refreshTokenAndRetry(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.tokenService.checkAndRefreshToken().pipe(
      take(1),
      switchMap((newTokens) => {
        if (newTokens) {
          this.tokenService.setSession(newTokens, newTokens.userName, newTokens.userEmail);

          const newAuthReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newTokens.accessToken}`,
            },
          });

          return next.handle(newAuthReq);
        } else {
          this.tokenService.clearSession();
          return throwError(() => new Error('Token refresh failed. Please log in again.'));
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
