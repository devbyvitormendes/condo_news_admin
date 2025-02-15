import { Directive, ElementRef, HostListener } from '@angular/core';
import { PhoneMaskPipe } from '../pipes/phone-mask.pipe';

@Directive({
  selector: '[phoneMask]',
  standalone: true,
  providers: [PhoneMaskPipe]
})
export class PhoneMaskDirective {
  constructor(
    private el: ElementRef,
    private phoneMaskPipe: PhoneMaskPipe
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    const formattedValue = this.phoneMaskPipe.transform(value);
    input.value = formattedValue;
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 0) return;
    
    const numbers = input.value.replace(/\D/g, '');
    if (numbers.length < 8) {
      input.value = '';
    }
  }
} 