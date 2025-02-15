import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { ResidentModel } from '../../model/resident.model';
import { isPlatformBrowser } from '@angular/common';
import { PageResponseModel } from '../../model/pagination/pageResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  apiUrl: string = 'http://localhost:8686/api/v1/resident';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('access_token') || '';
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers':
        "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });
  }

  getResidents() {
    return this.http.get<PageResponseModel<ResidentModel>>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  getResident(id: string) {
    return this.http.get<ResidentModel>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addResident(resident: ResidentModel) {
    return this.http.post<ResidentModel>(this.apiUrl, resident, {
      headers: this.getHeaders(),
    });
  }

  updateResident(resident: ResidentModel) {
    return this.http.put<ResidentModel>(this.apiUrl, resident, {
      headers: this.getHeaders(),
    });
  }

  deleteResident(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
