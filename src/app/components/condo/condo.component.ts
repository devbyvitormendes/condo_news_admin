import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CondoService } from '../../services/condo/condo.service';
import { CondoModel } from '../../model/condo.model';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
import { MatIconModule } from '@angular/material/icon';
import { CepService } from '../../services/cep/cep.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CepPipe } from '../../shared/pipes/cep.pipe';
import { ToastComponent } from '../ui/toast/toast.component';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-condo',
  standalone: true,
  imports: [SpinnerComponent, MatIconModule, ReactiveFormsModule, CepPipe, ToastComponent],
  templateUrl: './condo.component.html',
  styleUrl: './condo.component.scss',
})
export class CondoComponent implements OnInit {
  condo: CondoModel = CondoModel.constructorEmpty();
  condoService = inject(CondoService);
  cepService = inject(CepService);
  toastService = inject(ToastService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  isEditCondo: boolean = false;
  condoForm: FormGroup = new FormGroup({});

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.createCondoForm();

    const condoId = this.getFromStorage('id_condo');
    if (condoId) {
      this.condoService.getCondoById(condoId).subscribe((response) => {
        this.condo = response;
        this.patchCondoForm();
      });
    }
  }

  private getFromStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  createCondoForm() {
    this.condoForm = this.formBuilder.group({
      zipCode: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      condoPhone: [''],
      condoEmail: [''],
    });
  }

  patchCondoForm() {
    this.condoForm.patchValue({
      zipCode: this.condo.zipCode,
      address: this.condo.address,
      city: this.condo.city,
      state: this.condo.state,
      condoPhone: this.condo.condoPhone,
      condoEmail: this.condo.condoEmail,
    });
  }

  editCondo() {
    this.isEditCondo = true;
  }

  cancel() {
    this.isEditCondo = false;
    this.patchCondoForm();
  }

  searchZipCode() {
    this.cepService
      .getCepInfo(this.condoForm.get('zipCode')?.value)
      .subscribe((response) => {
        this.condo.zipCode = response.cep;
        this.condo.address = response.logradouro;
        this.condo.city = response.localidade;
        this.condo.state = response.uf;
      });
  }

  isFormValid() {
    return this.condoForm.valid;
  }

  updateCondo() {
    if (this.isFormValid()) {
      const condoUpdate: CondoModel = this.condoForm.value;
      condoUpdate.id = this.condo.id;

      this.condoService.updateCondo(condoUpdate).subscribe({
        next: (response) => {
          this.toastService.success('Atualizado', 'Condomínio atualizado com sucesso');
          this.condo = response;
          this.isEditCondo = false;
        },
        error: (error) => {
          this.toastService.error('Erro', 'Erro ao atualizar condomínio');
          console.error('Error updating condo:', error);
        }
      });
    }
  }

}
