import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

interface SpinnerConfig {
  type: string;
  bdColor: string;
  color: string;
  fullScreen: boolean;
  size: 'small' | 'default' | 'medium' | 'large';
}

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private busyRequestCount = 0;
  private readonly defaultConfig: SpinnerConfig = {
    type: 'ball-atom',
    bdColor: '#0C0C0C80',
    color: '#EAEAEA',
    fullScreen: true,
    size: 'default'
  };

  private readonly spinnerService = inject(NgxSpinnerService);

  start(config?: Partial<SpinnerConfig>): void {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      ...this.defaultConfig,
      ...config
    });
  }

  stop(): void {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }

  /**
   * Force stops all spinners regardless of the busy count
   */
  forceStop(): void {
    this.busyRequestCount = 0;
    this.spinnerService.hide();
  }
}
