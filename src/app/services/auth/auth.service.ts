import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '../../model/auth/auth.model';
import { AuthRequestModel } from '../../model/auth/authRequest.model';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public avail: boolean = false;
  public message: string = '';

  apiUrlLogin: string = 'http://localhost:8686/api/v1/auth/authenticate';

  headers: any = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  http = inject(HttpClient);
  router = inject(Router);

  login(authRequest: AuthRequestModel): Observable<AuthModel> {
    return this.http
      .post<AuthModel>(this.apiUrlLogin, authRequest, { headers: this.headers })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.setStorageItem('access_token', response.token);
            this.setStorageItem('refresh_token', response.refreshToken);
            this.setStorageItem('expires_at', response.expiresAt.toString());
            this.setStorageItem('id_condo', response.idCondo);
            this.router.navigate(['/home']);
          } else {
            this.message = response.message;
            throw new Error(this.message);
          }
        })
      );
  }

  private setStorageItem(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private getStorageItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private removeStorageItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  private checkSessionExpiration() {
    const expireAt = this.getStorageItem('expire_at');
    if (expireAt) {
      const now = new Date().getTime();
      const expireTime = parseInt(expireAt);
      if (now > expireTime) {
        this.logout();
      }
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return (
        sessionStorage.getItem('access_token') ||
        localStorage.getItem('access_token')
      );
    }
    return null;
  }

  logout(): void {
    this.removeStorageItem('access_token');
    this.removeStorageItem('refresh_token');
    this.removeStorageItem('expire_at');
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}
