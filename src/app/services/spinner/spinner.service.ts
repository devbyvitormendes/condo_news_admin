import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
    busyRequestCount: number = 0;
  
    ngxSpinnerService = inject(NgxSpinnerService); 

    start() {
      this.busyRequestCount++;
      this.ngxSpinnerService.show(undefined, {
          type: 'ball-atom',
          bdColor: '#0C0C0C80',
          color: '#EAEAEA',
          fullScreen: true,
          size: 'default'
      });
    }

    stop() {
      this.busyRequestCount--;
      if (this.busyRequestCount <= 0) {
        this.busyRequestCount = 0;
        this.ngxSpinnerService.hide();
      }
    }
}
