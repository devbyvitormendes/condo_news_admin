import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ResidentModel } from '../../../model/resident.model';
import { ResidentService } from '../../../services/resident/resident.service';
import { SpinnerComponent } from '../../ui/spinner/spinner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PhoneMaskDirective } from '../../../shared/directives/phone-mask.directive';
import { ToastComponent } from '../../ui/toast/toast.component';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-resident-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    SpinnerComponent,
    ReactiveFormsModule,
    PhoneMaskDirective,
    ToastComponent,
  ],
  providers: [ToastService],
  templateUrl: './resident-form.component.html',
  styleUrl: './resident-form.component.scss',
})
export class ResidentFormComponent {
  residentService = inject(ResidentService);
  toastService = inject(ToastService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);

  resident: ResidentModel = ResidentModel.constructorEmpty();
  isEditResident: boolean = false;
  residentForm: FormGroup = new FormGroup({});

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.createResidentForm();
    if (this.route.snapshot.params['id']) {
      this.isEditResident = true;
      this.residentService
        .getResident(this.route.snapshot.params['id'])
        .subscribe((resident) => {
          this.resident = resident;
          this.patchResidentForm();
        });
    }
  }

  createResidentForm() {
    this.residentForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      apartment: ['', Validators.required],
    });
  }

  patchResidentForm() {
    this.residentForm.patchValue(this.resident);
  }

  isFormValid() {
    return this.residentForm.valid;
  }

  saveResident() {
    if (this.isEditResident) {
      this.updateResident();
    } else {
      this.addResident();
    }
  }

  addResident() {
    if (this.residentForm.valid) {
      this.resident = this.residentForm.value;
      this.resident.idCondo = this.getFromStorage('id_condo') || '';

      this.residentService.addResident(this.resident).subscribe({
        next: () => {
          this.toastService.success('Criado', 'Morador cadastrado com sucesso');
          this.goBack();
        },
        error: (error) => {
          this.toastService.error('Erro', 'Erro ao cadastrar morador');
          console.error('Error adding resident:', error);
        },
      });
    }
  }

  updateResident() {
    if (this.residentForm.valid) {
      this.resident = this.residentForm.value;
      this.resident.id = this.route.snapshot.params['id'];
      this.resident.idCondo = this.getFromStorage('id_condo') || '';
      this.residentService
        .updateResident(this.resident)
        .subscribe({
          next: () => {
            this.toastService.success('Atualizado', 'Morador atualizado com sucesso');
            this.goBack();
          },
          error: (error) => {
            this.toastService.error('Erro', 'Erro ao atualizar morador');
            console.error('Error updating resident:', error);
          },
      });
    }
  }

  private getFromStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  goBack() {
    window.history.back();
  }
}
