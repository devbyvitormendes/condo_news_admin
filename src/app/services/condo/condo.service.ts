import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CondoModel } from '../../model/condo.model';
import { PageResponseModel } from '../../model/pagination/pageResponse.model';
import { BaseService } from '../base.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CondoService extends BaseService {
  private readonly endpoint = '/condo';

  constructor(private authService: AuthService) {
    super();
  }

  getCondos(): Observable<PageResponseModel<CondoModel>> {
    return this.http
      .get<PageResponseModel<CondoModel>>(`${this.apiUrl}${this.endpoint}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  getCondoById(id: string): Observable<CondoModel> {
    return this.http
      .get<CondoModel>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  addCondo(condo: CondoModel): Observable<CondoModel> {
    return this.http
      .post<CondoModel>(`${this.apiUrl}${this.endpoint}`, condo)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  updateCondo(condo: CondoModel): Observable<CondoModel> {
    return this.http
      .put<CondoModel>(`${this.apiUrl}${this.endpoint}`, condo)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  deleteCondo(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }
}
