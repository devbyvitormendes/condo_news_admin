import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faHome,
  faNewspaper,
  faBuilding,
  faBars,
  faClose,
} from '@fortawesome/free-solid-svg-icons';

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
  ];

  toggleCollapse(): void {
    this.changeIsSidebarCollapsed.emit(!this.isSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsSidebarCollapsed.emit(true);
  }
}
