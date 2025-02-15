import { Component, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ResidentModel } from '../../model/resident.model';
import { ResidentService } from '../../services/resident/resident.service';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';
import { Router } from '@angular/router';
import { PhoneMaskPipe } from '../../shared/pipes/phone-mask.pipe';
import { ToastComponent } from '../ui/toast/toast.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    CpfPipe,
    PhoneMaskPipe,
    ToastComponent,
  ],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.scss',
})
export class ResidentsComponent implements OnInit {
  residentsDataSource: MatTableDataSource<ResidentModel> =
    new MatTableDataSource();
  toastService = inject(ToastService);
  residentService = inject(ResidentService);
  router = inject(Router);

  displayedColumns: string[] = [
    'name',
    'email',
    'cpf',
    'phone',
    'apartment',
    'actions',
  ];
  currentPage: number = 0;

  ngOnInit(): void {
    this.getResidents();
  }

  reload() {
    this.getResidents();
  }

  getResidents() {
    this.residentService.getResidents().subscribe((response) => {
      this.residentsDataSource.data = response.content;
    });
  }

  editResident(id: string) {
    this.router.navigate(['/residents/edit/' + id]);
  }

  deleteResident(id: string) {
    this.residentService.deleteResident(id).subscribe({
      next: () => {
        this.toastService.success('Excluído', 'Morador excluído com sucesso');
        this.getResidents();
      },
      error: (error) => {
        this.toastService.error('Erro', 'Erro ao excluir morador');
        console.error('Error deleting resident:', error);
      },
    });
  }

  addResident() {
    this.router.navigate(['/residents/add']);
  }
}
