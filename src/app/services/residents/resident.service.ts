import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResidentModel } from '../../model/resident.model';
import { PageResponseModel } from '../../model/pagination/pageResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  apiUrlResident: string = 'http://localhost:8686/api/v1/resident';

  headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });

  constructor() {}

  http = inject(HttpClient);

  getResidents() {
    return this.http.get<PageResponseModel<ResidentModel>>(
      this.apiUrlResident,
      {
        headers: this.headers,
      }
    );
  }

  deleteResidents(id: string) {
    return this.http.delete(this.apiUrlResident + `/${id}`, {
      headers: this.headers,
    });
  }
}
