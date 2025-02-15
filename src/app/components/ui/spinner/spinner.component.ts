import { Component } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgxSpinnerModule],
  template: `
    <ngx-spinner 
      type="ball-scale-multiple"
      [fullScreen]="false"
      size="medium"
      color="#354c6b">
      <p style="color: #354c6b">Carregando...</p>
    </ngx-spinner>
  `
})
export class SpinnerComponent {}
