import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
  standalone: true
})
export class CepPipe implements PipeTransform {

  transform(value: string): string {

    let valueTranform = value.replace(/\D/g, '')
    let mascara = /^(\d{5})(\d{3})$/

    let result = valueTranform.replace(mascara, '$1-$2');

    return result;
  }

}