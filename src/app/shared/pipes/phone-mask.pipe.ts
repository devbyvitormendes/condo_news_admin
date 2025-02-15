import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
  standalone: true
})
export class PhoneMaskPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';

    let numbers = value.replace(/\D/g, '');

    if (numbers.length === 8) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    }

    if (numbers.length === 9) {
      return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    }

    if (numbers.length === 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }

    if (numbers.length === 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }

    return numbers;
  }
} 