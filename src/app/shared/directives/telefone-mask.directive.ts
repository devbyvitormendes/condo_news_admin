import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[telefoneMask]' // A diretiva será aplicada ao elemento com a propriedade telefoneMask
})
export class TelefoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    let value = event.target.value;
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Aplica a máscara baseada no tamanho da entrada
    if (value.length <= 2) {
      // DDD
      this.el.nativeElement.value = value;
    } else if (value.length <= 7) {
      // DDD + primeiro conjunto de números do telefone/celular
      this.el.nativeElement.value = `${value.substring(0, 2)} (${value.substring(2)})`;
    } else if (value.length <= 11) {
      // Máscara para telefone fixo
      this.el.nativeElement.value = `${value.substring(0, 2)} (${value.substring(2, 6)})-${value.substring(6)}`;
    } else if (value.length <= 15) {
      // Máscara para celular
      this.el.nativeElement.value = `${value.substring(0, 2)} (${value.substring(2, 7)})-${value.substring(7)}`;
    } else {
      // Se o valor exceder o tamanho esperado, não aplique a máscara
      this.el.nativeElement.value = value;
    }
  }
}
