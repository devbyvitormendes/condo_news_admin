import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewsModel } from '../../model/news.model';
import { PageResponseModel } from '../../model/pagination/pageResponse.model';
import { BaseService } from '../base.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService extends BaseService {
  private readonly endpoint = '/news';
  private readonly breakingEndpoint = `${this.endpoint}/breaking`;

  constructor(private authService: AuthService) {
    super();
  }

  getBreakingNews(): Observable<PageResponseModel<NewsModel>> {
    return this.http
      .get<PageResponseModel<NewsModel>>(`${this.apiUrl}${this.breakingEndpoint}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  getNews(): Observable<PageResponseModel<NewsModel>> {
    return this.http
      .get<PageResponseModel<NewsModel>>(`${this.apiUrl}${this.endpoint}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  getNewsById(id: string): Observable<NewsModel> {
    return this.http
      .get<NewsModel>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  addNews(news: NewsModel): Observable<NewsModel> {
    const newsWithCondo = { ...news, idCondo: this.getCondoId() };
    return this.http
      .post<NewsModel>(`${this.apiUrl}${this.endpoint}`, newsWithCondo)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  updateNews(news: NewsModel): Observable<NewsModel> {
    const newsWithCondo = { ...news, idCondo: this.getCondoId() };
    return this.http
      .put<NewsModel>(`${this.apiUrl}${this.endpoint}`, newsWithCondo)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }

  deleteNews(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}${this.endpoint}/${id}`)
      .pipe(catchError((error) => this.handleError(error, this.authService)));
  }
}
