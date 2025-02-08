import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewsModel } from '../../model/news.model';
import { PageResponseModel } from '../../model/pagination/pageResponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiUrlBreakingNews: string = 'http://localhost:8686/api/v1/news/breaking';
  apiUrlNews: string = 'http://localhost:8686/api/v1/news';

  headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });

  constructor() {}

  http = inject(HttpClient);

  getBreakingNews() {
    return this.http.get<PageResponseModel<NewsModel>>(
      this.apiUrlBreakingNews,
      {
        headers: this.headers,
      }
    );
  }

  getNews() {
    return this.http.get<PageResponseModel<NewsModel>>(this.apiUrlNews, {
      headers: this.headers,
    });
  }

  getNewsById(id: string) {
    return this.http.get<NewsModel>(this.apiUrlNews + `/${id}`, {
      headers: this.headers,
    });
  }

  addNews(news: NewsModel): Observable<NewsModel> {
    return this.http.post<NewsModel>(this.apiUrlNews, news, {
      headers: this.headers,
    });
  }

  deleteNews(id: string) {
    return this.http.delete(this.apiUrlNews + `/${id}`, {
      headers: this.headers,
    });
  }

  updateNews(news: NewsModel) {
    return this.http.put<NewsModel>(this.apiUrlNews, news, {
      headers: this.headers,
    });
  }
  
}
