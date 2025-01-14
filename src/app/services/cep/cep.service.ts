import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ViaCepModel } from "../../model/viacep/viacep.model";

@Injectable({
  providedIn: 'root',
})
export class CepService {
    cep: string = '';
    apiUrlViaCep: string = 'https://viacep.com.br/ws/' + this.cep + '/json/';

    constructor() { }

    http = inject(HttpClient);
    
      getCepInfo(cep: string) {
        this.cep = cep;

        return this.http.get<ViaCepModel>(this.apiUrlViaCep);
      }
}