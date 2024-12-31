import { Component, inject, OnInit } from '@angular/core';
import { CondoService } from '../../services/condo/condo.service';

@Component({
  selector: 'app-condo',
  standalone: true,
  imports: [],
  templateUrl: './condo.component.html',
  styleUrl: './condo.component.scss'
})
export class CondoComponent implements OnInit {

  condoService = inject(CondoService);

  ngOnInit(): void {
    const condoId = localStorage.getItem('id_condo');
    if (condoId) {
      this.condoService.getCondoInfo(condoId);
    }
  }

}
