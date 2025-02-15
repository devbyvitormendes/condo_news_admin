import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { NewsModel } from '../../model/news.model';
import { PageResponseModel } from '../../model/pagination/pageResponse.model';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiUrlBreakingNews: string = 'http://localhost:8686/api/v1/news/breaking';
  apiUrlNews: string = 'http://localhost:8686/api/v1/news';

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

  getBreakingNews() {
    return this.http.get<PageResponseModel<NewsModel>>(
      this.apiUrlBreakingNews,
      {
        headers: this.getHeaders(),
      }
    );
  }

  getNews() {
    return this.http.get<PageResponseModel<NewsModel>>(this.apiUrlNews, {
      headers: this.getHeaders(),
    });
  }

  getNewsById(id: string): Observable<NewsModel> {
    return this.http.get<NewsModel>(`${this.apiUrlNews}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addNews(news: NewsModel): Observable<NewsModel> {
    news.idCondo = this.getCondoId();
    return this.http.post<NewsModel>(this.apiUrlNews, news, {
      headers: this.getHeaders(),
    });
  }

  deleteNews(id: string) {
    return this.http.delete(this.apiUrlNews + `/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateNews(news: NewsModel): Observable<NewsModel> {
    news.idCondo = this.getCondoId();
    return this.http.put<NewsModel>(this.apiUrlNews, news, {
      headers: this.getHeaders(),
    });
  }
}
