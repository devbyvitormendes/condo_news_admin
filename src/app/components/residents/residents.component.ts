import { Component, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ResidentModel } from '../../model/residents/resident.model';
import { ResidentService } from '../../services/residents/resident.service';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    CpfPipe,
  ],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.scss',
})
export class ResidentsComponent implements OnInit {
  residentsDataSource: MatTableDataSource<ResidentModel> =
    new MatTableDataSource();
  residentService = inject(ResidentService);

  displayedColumns: string[] = ['name', 'email', 'cpf', 'phone', 'apartment', 'actions'];
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
    alert('Edit: ' + id);
  }

  deleteResident(id: string) {
    this.residentService.deleteResidents(id).subscribe(() => {
      this.getResidents();
    });
  }
}
