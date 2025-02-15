import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(0);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustScreenWidth((event.target as Window).innerWidth);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustScreenWidth();
    }
  }

  changeIsSidebarCollapsed(isSidebarCollapsed: boolean): void {
    this.isSidebarCollapsed.set(isSidebarCollapsed);
  }

  adjustScreenWidth(newWidth?: number): void {
    this.screenWidth.set(
      newWidth ?? (isPlatformBrowser(this.platformId) ? window.innerWidth : 0)
    );
    this.isSidebarCollapsed.set(this.screenWidth() < 768);
  }
}
