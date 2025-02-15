import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faHome,
  faNewspaper,
  faBuilding,
  faBars,
  faClose,
  faSignOut,
  faSign,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  faBars = faBars;
  faClose = faClose;
  faHome = faHome;
  faBuilding = faBuilding;
  faNews = faNewspaper;
  faUsers = faUsers;
  faSignOut = faSignOut;

  isSidebarCollapsed = input.required<boolean>();
  changeIsSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'home',
      icon: faHome,
      label: 'Home',
    },
    {
      routeLink: 'condo',
      icon: faBuilding,
      label: 'Condomínio',
    },
    {
      routeLink: 'news',
      icon: faNewspaper,
      label: 'Notícias',
    },
    {
      routeLink: 'residents',
      icon: faUsers,
      label: 'Residentes',
    },
    {
      routeLink: 'login',
      icon: faSignOut,
      label: 'Sair',
    },
  ];

  authService = inject(AuthService);

  toggleCollapse(): void {
    this.changeIsSidebarCollapsed.emit(!this.isSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsSidebarCollapsed.emit(true);
  }

  onLogout(): void {
    this.authService.logout();
  }

}
