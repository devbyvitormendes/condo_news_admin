import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Skip auth for authentication endpoints
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  console.log('Env Headers: ', environment.securityHeaders);

  // Add security headers to all requests
  let secureReq = req.clone({
    setHeaders: environment.securityHeaders
  });
  
  const token = authService.getToken();
  if (token) {
    secureReq = secureReq.clone({
      setHeaders: {
        ...secureReq.headers,
        Authorization: `Bearer ${token}`
      }
    });
  }

  console.log('Headers:', secureReq.headers);

  return next(secureReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Try to refresh the token
        return authService.refreshToken().pipe(
          switchMap(success => {
            if (success) {
              // Retry the original request with new token
              const newToken = authService.getToken();
              const retryReq = req.clone({
                setHeaders: {
                  ...environment.securityHeaders,
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next(retryReq);
            }
            // If refresh failed, logout and redirect
            authService.logout();
            return throwError(() => new Error('Session expired'));
          })
        );
      }
      return throwError(() => error);
    })
  );
};