import { CommonModule } from '@angular/common';
import { Component, computed, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input() isSidebarCollapsed: boolean = false;
  @Input() screenWidth: number = 0;
}
