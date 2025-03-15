import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DashboardModel } from '../../model/dashboard.model';
import { BaseService } from '../base.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  private readonly endpoint = '/dashboard';
  
  constructor(private authService: AuthService) {
    super();
  }

  getDashboard(): Observable<DashboardModel> {
    return this.http
      .get<DashboardModel>(`${this.apiUrl}${this.endpoint}/${this.getCondoId()}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }
}
