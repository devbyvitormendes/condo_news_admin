import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '../../model/auth/auth.model';
import { AuthRequestModel } from '../../model/auth/authRequest.model';
import { BaseService } from '../base.service';
import { Observable, tap, catchError, of, switchMap, timeout } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  public avail: boolean = false;
  public message: string = '';

  apiUrlLogin: string = `${this.apiUrl}/auth/authenticate`;
  apiUrlRefresh: string = `${this.apiUrl}/auth/refresh-token`;
  
  private refreshTokenInProgress = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, protected override http: HttpClient) {
    super();
  }

  login(authRequest: AuthRequestModel): Observable<AuthModel> {
    return this.http
      .post<AuthModel>(this.apiUrlLogin, authRequest)
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
        }),
        catchError((error) => this.handleError(error, this))
      );
  }

  refreshToken(): Observable<boolean> {
    if (this.refreshTokenInProgress) {
      return of(false);
    }

    this.refreshTokenInProgress = true;
    const refreshToken = this.getStorageItem('refresh_token');

    if (!refreshToken) {
      this.refreshTokenInProgress = false;
      this.logout();
      return of(false);
    }

    return this.http.post<AuthModel>(this.apiUrlRefresh, { refreshToken }).pipe(
      timeout(5000),
      switchMap((response) => {
        this.refreshTokenInProgress = false;
        if (response && response.token) {
          this.setStorageItem('access_token', response.token);
          this.setStorageItem('refresh_token', response.refreshToken);
          this.setStorageItem('expires_at', response.expiresAt.toString());
          return of(true);
        }
        this.logout();
        return of(false);
      }),
      catchError((error) => this.handleError(error, this))
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

  isTokenExpired(): boolean {
    const expiresAt = this.getStorageItem('expires_at');
    if (!expiresAt) {
      return true;
    }
    
    const expirationTime = parseInt(expiresAt);
    const now = new Date().getTime();
    
    return now >= expirationTime;
  }

  getToken(): string | null {
    try {
      if (isPlatformBrowser(this.platformId)) {
        if (this.isTokenExpired()) {
          return null;
        }
        
        const token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token');
        return token;
      }
    } catch (error) {
      console.error('Error in getToken:', error);
    }
    return null;
  }

  hasRefreshToken(): boolean {
    return !!this.getStorageItem('refresh_token');
  }

  logout(): void {
    this.removeStorageItem('access_token');
    this.removeStorageItem('refresh_token');
    this.removeStorageItem('expires_at');
    this.removeStorageItem('id_condo');
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}
