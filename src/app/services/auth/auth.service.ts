import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '../../model/auth/auth.model';
import { AuthRequestModel } from '../../model/auth/authRequest.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public avail: boolean = false;
  public message: string = '';

  private isAuthenticated: boolean = false;
  private authToken: string | null = null;

  apiUrlLogin: string = 'http://localhost:8686/api/v1/auth/authenticate';

  headers: any = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  };

  constructor() {}

  http = inject(HttpClient);
  router = inject(Router);

  login(authRequest: AuthRequestModel) {
    return this.http
      .post<AuthModel>(this.apiUrlLogin, authRequest, { headers: this.headers })
      .subscribe((response) => {
        if (response.token) {
          this.setStorageItem('access_token', response.token);
          this.setStorageItem('refresh_token', response.refreshToken);
          this.setStorageItem('expires_at', response.expiresAt.toString());
          this.setStorageItem('id_condo', response.idCondo);
          this.isAuthenticated = true;
          this.router.navigate(['/home']);
        } else {
          this.isAuthenticated = false;
          this.message = response.message;
          alert(this.message);
        }
      });
  }

  private setStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private getStorageItem(key: string) {
    return localStorage.getItem(key);
  }

  private removeStorageItem(key: string) {
    localStorage.removeItem(key);
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

  isLoggedIn(): boolean {
    this.checkSessionExpiration();
    this.authToken = this.getToken();
    return !!this.authToken;
  }

  getToken(): string | null {
    return (
      sessionStorage.getItem('access_token') ||
      localStorage.getItem('access_token')
    );
  }

  logout(): void {
    this.removeStorageItem('access_token');
    this.removeStorageItem('refresh_token');
    this.removeStorageItem('expire_at');
    sessionStorage.clear();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}