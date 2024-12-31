import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  apiBaseUrlv1: string = 'http://localhost:8686/api/v1';
  baseHeaders: HttpHeaders = new HttpHeaders();

  constructor() {
    this.baseHeaders.append('Access-Control-Allow-Origin', '*');
    this.baseHeaders.append('Access-Control-Allow-Methods', '*');
    this.baseHeaders.append(
      'Access-Control-Allow-Headers',
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'"
    );
  }
}
