import { Component, inject, OnInit } from '@angular/core';
import { CondoService } from '../../services/condo/condo.service';
import { CondoModel } from '../../model/condo/condo.model';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatIconModule } from '@angular/material/icon';
import { CepService } from '../../services/cep/cep.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CepPipe } from '../../shared/pipes/cep.pipe';

@Component({
  selector: 'app-condo',
  standalone: true,
  imports: [SpinnerComponent, MatIconModule, ReactiveFormsModule, CepPipe],
  templateUrl: './condo.component.html',
  styleUrl: './condo.component.scss',
})
export class CondoComponent implements OnInit {
  condo: CondoModel = CondoModel.constructorEmpty();
  condoService = inject(CondoService);
  cepService = inject(CepService);
  formBuilder = inject(FormBuilder);

  isEditCondo: boolean = false;
  condoForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.createCondoForm();

    const condoId = localStorage.getItem('id_condo');
    if (condoId) {
      this.condoService.getCondoInfo(condoId).subscribe((response) => {
        this.condo = response;
        this.patchCondoForm();
      });
    }
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

      this.condoService.updateCondo(condoUpdate).subscribe((response) => {
        this.condo = response;
        this.isEditCondo = false;
      });
    }
  }
}
