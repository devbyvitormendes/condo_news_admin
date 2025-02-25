import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../ui/toast/toast.component';
import { ToastService } from '../../services/toast/toast.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { DashboardModel } from '../../model/dashboard.model';
import { SpinnerComponent } from '../ui/spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @Input() isSidebarCollapsed: boolean = false;
  @Input() screenWidth: number = 0;
  dashboard: DashboardModel = DashboardModel.constructorEmpty();

  toastService = inject(ToastService);
  dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.getDashboard();
  }

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

  getDashboard() {
    this.dashboardService.getDashboard().subscribe((response) => {
      this.dashboard = response;
    });
  }
}
