import { trigger } from '@angular/animations';
import { transition } from '@angular/animations';
import { animate } from '@angular/animations';
import { style } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Toast, ToastService } from '../../../services/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(100%)' })
        ),
      ]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  toastService = inject(ToastService);

  toasts: Toast[] = [];
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
