import { Component, inject, OnInit } from '@angular/core';
import { CondoService } from '../../services/condo/condo.service';
import { CondoModel } from '../../model/condo/condo.model';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-condo',
  standalone: true,
  imports: [SpinnerComponent, MatIconModule],
  templateUrl: './condo.component.html',
  styleUrl: './condo.component.scss',
})
export class CondoComponent implements OnInit {
  condo: CondoModel = CondoModel.constructorEmpty();
  condoService = inject(CondoService);
  spinnerService = inject(SpinnerService);

  ngOnInit(): void {
    const condoId = localStorage.getItem('id_condo');
    if (condoId) {
      this.condoService.getCondoInfo(condoId).subscribe((response) => {
        this.condo = response;
      });
    }
  }
}
