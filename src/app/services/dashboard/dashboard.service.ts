import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardModel } from '../../model/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiUrlDashboard: string = 'http://localhost:8686/api/v1/dashboard';

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

  private getCondoId(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('id_condo') || '';
    }
    return '';
  }

  getDashboard() {
    return this.http.get<DashboardModel>(
      `${this.apiUrlDashboard}/${this.getCondoId()}`,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
