import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CondoModel } from '../../model/condo.model';
import { PageResponseModel } from '../../model/pagination/pageResponse.model';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CondoService {
  apiUrlCondo: string = 'http://localhost:8686/api/v1/condo';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('access_token') || '';
    }
    
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'"
    });
  }

  private getCondoId(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('id_condo') || '';
    }
    return '';
  }

  getCondos() {
    return this.http.get<PageResponseModel<CondoModel>>(this.apiUrlCondo, {
      headers: this.getHeaders(),
    });
  }

  getCondoById(id: string): Observable<CondoModel> {
    return this.http.get<CondoModel>(`${this.apiUrlCondo}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addCondo(condo: CondoModel): Observable<CondoModel> {
    return this.http.post<CondoModel>(this.apiUrlCondo, condo, {
      headers: this.getHeaders(),
    });
  }

  updateCondo(condo: CondoModel): Observable<CondoModel> {
    return this.http.put<CondoModel>(this.apiUrlCondo, condo, {
      headers: this.getHeaders(),
    });
  }

  deleteCondo(id: string) {
    return this.http.delete(this.apiUrlCondo + `/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
