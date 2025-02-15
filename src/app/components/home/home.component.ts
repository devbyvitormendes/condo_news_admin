import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../ui/toast/toast.component';
import { ToastService } from '../../services/toast/toast.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input() isSidebarCollapsed: boolean = false;
  @Input() screenWidth: number = 0;

  toastService = inject(ToastService);

  success() {
    this.toastService.success('Success', 'Mensagem do deu bom');
  }

  error() {
    this.toastService.error('Error', 'This is a error message');
  }

  warning() {
    this.toastService.warning('Warning', 'This is a warning message');
  }

  info() {
    this.toastService.info('Info', 'This is a info message');
  }
}
