export interface ViaCepModel {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export class ViaCepResponse implements ViaCepModel {
  cep: string = '';
  logradouro: string = '';
  complemento: string = '';
  bairro: string = '';
  localidade: string = '';
  uf: string = '';
  ibge: string = '';
  gia: string = '';
  ddd: string = '';
  siafi: string = '';
  erro?: boolean;

  constructor(data?: Partial<ViaCepModel>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static empty(): ViaCepResponse {
    return new ViaCepResponse();
  }

}
