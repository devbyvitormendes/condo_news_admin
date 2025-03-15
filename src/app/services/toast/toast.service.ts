import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastConfig {
  defaultDuration: number;
  maxToasts: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService implements OnDestroy {
  private readonly defaultConfig: ToastConfig = {
    defaultDuration: 3000,
    maxToasts: 5
  };

  private toasts: Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  private destroy$ = new Subject<void>();

  readonly toasts$: Observable<Toast[]> = this.toastSubject.asObservable();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.toastSubject.complete();
  }

  private show(title: string | undefined, message: string, type: ToastType, duration?: number): number {
    const id = Date.now();
    const toast: Toast = { 
      id, 
      title, 
      message, 
      type,
      duration: duration || this.defaultConfig.defaultDuration 
    };

    // Remove oldest toast if we exceed maxToasts
    if (this.toasts.length >= this.defaultConfig.maxToasts) {
      const oldestToast = this.toasts[0];
      this.remove(oldestToast.id);
    }

    this.toasts.push(toast);
    this.toastSubject.next([...this.toasts]);

    // Setup auto-removal
    setTimeout(
      () => this.remove(id),
      toast.duration
    );

    return id;
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.toastSubject.next([...this.toasts]);
  }

  removeAll(): void {
    this.toasts = [];
    this.toastSubject.next([]);
  }

  success(message: string, title?: string, duration?: number): number {
    return this.show(title, message, 'success', duration);
  }

  error(message: string, title?: string, duration?: number): number {
    return this.show(title, message, 'error', duration);
  }

  warning(message: string, title?: string, duration?: number): number {
    return this.show(title, message, 'warning', duration);
  }

  info(message: string, title?: string, duration?: number): number {
    return this.show(title, message, 'info', duration);
  }
}
