import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ToastService } from './toast/toast.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  protected readonly apiUrl = environment.apiUrl;
  protected http = inject(HttpClient);
  protected toastService = inject(ToastService);

  protected handleError(error: HttpErrorResponse, authService: AuthService): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Network error: Please check your connection';
    } else {
      console.log(error);
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Invalid request';
          break;
        case 401:
          errorMessage = 'Session expired. Please login again';
          authService.logout();
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action';
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later';
          break;
        default:
          errorMessage = 'Something went wrong';
      }
    }

    this.toastService.error('Error', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  protected getCondoId(): string {
    const condoId = sessionStorage.getItem('condoId');
    if (!condoId) {
        throw new Error('Condo ID is not available in sessionStorage');
    }
    return condoId;
  }
}
