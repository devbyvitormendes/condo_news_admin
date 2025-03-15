import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ViaCepModel } from '../../model/viacep.model';
import { BaseService } from '../base.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CepService extends BaseService {
  private readonly viaCepBaseUrl = 'https://viacep.com.br/ws';

  constructor(private authService: AuthService) {
    super();
  }

  getCepInfo(cep: string): Observable<ViaCepModel> {
    const formattedCep = cep.replace(/\D/g, ''); // Remove non-digits
    if (formattedCep.length !== 8) {
      return new Observable(observer => {
        observer.error(new Error('CEP must have 8 digits'));
      });
    }

    return this.http
      .get<ViaCepModel>(`${this.viaCepBaseUrl}/${formattedCep}/json`)
      .pipe(
        map(response => {
          if (response.erro) {
            throw new Error('CEP not found');
          }
          return response;
        }),
        catchError((error) => this.handleError(error, this.authService))
      );
  }
}