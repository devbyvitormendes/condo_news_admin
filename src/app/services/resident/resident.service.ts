import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResidentModel } from '../../model/resident.model';
import { PageResponseModel } from '../../model/pagination/pageResponse.model';
import { BaseService } from '../base.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ResidentService extends BaseService {
  private readonly endpoint = '/resident';

  constructor(private authService: AuthService) {
    super();
  }

  getResidents(): Observable<PageResponseModel<ResidentModel>> {
    return this.http
      .get<PageResponseModel<ResidentModel>>(`${this.apiUrl}${this.endpoint}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  getResident(id: string): Observable<ResidentModel> {
    return this.http
      .get<ResidentModel>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  addResident(resident: ResidentModel): Observable<ResidentModel> {
    const residentWithCondo = { ...resident, idCondo: this.getCondoId() };
    return this.http
      .post<ResidentModel>(`${this.apiUrl}${this.endpoint}`, residentWithCondo)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  updateResident(resident: ResidentModel): Observable<ResidentModel> {
    const residentWithCondo = { ...resident, idCondo: this.getCondoId() };
    return this.http
      .put<ResidentModel>(`${this.apiUrl}${this.endpoint}`, residentWithCondo)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  deleteResident(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }
}
