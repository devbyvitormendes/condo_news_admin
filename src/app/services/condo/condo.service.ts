import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CondoModel } from '../../model/condo.model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class CondoService {
  apiUrlCondo: string = 'http://localhost:8686/api/v1/condo';

  headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });
  constructor() {}

  http = inject(HttpClient);

  getCondoInfo(id: string) {
    console.log(this.headers.get('Authorization'));
    return this.http
      .get<CondoModel>(this.apiUrlCondo + `/${id}`, {
        headers: this.headers,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
