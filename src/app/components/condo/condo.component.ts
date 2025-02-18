import { Component, inject, OnInit, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
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
  FormArray,
} from '@angular/forms';
import { CepPipe } from '../../shared/pipes/cep.pipe';
import { ToastComponent } from '../ui/toast/toast.component';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { ContactType } from '../../model/enums/contact_type.enum';
import { ContactModel } from '../../model/contact.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-condo',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatIconModule,
    ReactiveFormsModule,
    CepPipe,
    ToastComponent,
    MatTableModule,
    MatSelectModule,
    TitleCasePipe
  ],
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
  contactTypes = Object.values(ContactType);
  dataSource = new MatTableDataSource<ContactModel>([]);
  contactFormEnabled = false;
  contactForm: FormGroup = new FormGroup({});

  displayedViewColumns: string[] = [
    'name',
    'phone',
    'email',
    'type',
  ];

  displayedEditColumns: string[] = [
    'name',
    'phone',
    'email',
    'type',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  brazilianStates = [
    { value: 'AC', label: 'AC' },
    { value: 'AL', label: 'AL' },
    { value: 'AP', label: 'AP' },
    { value: 'AM', label: 'AM' },
    { value: 'BA', label: 'BA' },
    { value: 'CE', label: 'CE' },
    { value: 'DF', label: 'DF' },
    { value: 'ES', label: 'ES' },
    { value: 'GO', label: 'GO' },
    { value: 'MA', label: 'MA' },
    { value: 'MT', label: 'MT' },
    { value: 'MS', label: 'MS' },
    { value: 'MG', label: 'MG' },
    { value: 'PA', label: 'PA' },
    { value: 'PB', label: 'PB' },
    { value: 'PR', label: 'PR' },
    { value: 'PE', label: 'PE' },
    { value: 'PI', label: 'PI' },
    { value: 'RJ', label: 'RJ' },
    { value: 'RN', label: 'RN' },
    { value: 'RS', label: 'RS' },
    { value: 'RO', label: 'RO' },
    { value: 'RR', label: 'RR' },
    { value: 'SC', label: 'SC' },
    { value: 'SP', label: 'SP' },
    { value: 'SE', label: 'SE' },
    { value: 'TO', label: 'TO' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.condoForm = this.formBuilder.group({
      zipCode: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      condoPhone: [''],
      condoEmail: [''],
      contact: this.formBuilder.array([])
    });

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: [ContactType.OTHER, Validators.required]
    });
  }

  ngOnInit(): void {
    this.createCondoForm();

    const condoId = this.getFromStorage('id_condo');
    if (condoId) {
      this.condoService.getCondoById(condoId).subscribe((response) => {
        this.condo = response;
        this.patchCondoForm();
        this.initializeContactsTable();
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      contact: this.formBuilder.array([])
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

    this.patchContactsForm();
  }

  patchContactsForm() {
    const contactsArray = this.condoForm.get('contact') as FormArray;
    contactsArray.clear();
    
    this.condo.contacts?.forEach(contact => {
      contactsArray.push(this.formBuilder.group({
        id: [contact.id],
        name: [contact.name, Validators.required],
        phone: [contact.phone, Validators.required],
        email: [contact.email, [Validators.required, Validators.email]],
        type: [contact.type, Validators.required]
      }));
    });
  }

  editCondo() {
    this.isEditCondo = true;
  }

  cancel() {
    this.isEditCondo = false;
    this.patchCondoForm();
    this.dataSource.data = this.condo.contacts || [];
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

  get contactsFormArray() {
    return this.condoForm.get('contacts') as FormArray;
  }

  getContactsByType(type: ContactType) {
    return this.condo.contacts?.filter(contact => contact.type === type) || [];
  }

  showContactForm() {
    this.contactFormEnabled = true;
  }

  hideContactForm() {
    this.contactFormEnabled = false;
    this.contactForm.reset({
      type: ContactType.OTHER
    });
  }

  submitContact() {
    if (this.contactForm.valid) {
      const newContact: ContactModel = {
        id: '',
        name: this.contactForm.value.name,
        phone: this.contactForm.value.phone,
        email: this.contactForm.value.email,
        type: this.contactForm.value.type,
        condoId: this.condo.id
      };

      if (this.condo.contacts) {
        this.condo.contacts.push(newContact);
      } else {
        this.condo.contacts = [newContact];
      }

      this.updateCondo();      
      this.hideContactForm();
    }
  }

  updateCondo() {
    if (this.condoForm.valid) {
      const updatedCondo: CondoModel = {
        ...this.condoForm.value,
        contacts: this.condo.contacts,
        name: this.condo.name,
        id: this.condo.id
      };

      this.condoService.updateCondo(updatedCondo).subscribe({
        next: (response) => {
          this.toastService.success('Atualizado', 'Condomínio atualizado com sucesso');
          this.condo = response;
          this.isEditCondo = false;
          this.initializeContactsTable();
        },
        error: (error) => {
          this.toastService.error('Erro', 'Erro ao atualizar condomínio');
          console.error('Error updating condo:', error);
        }
      });
    }
  }

  initializeContactsTable() {
    if (this.condo?.contacts) {
      this.dataSource.data = this.condo.contacts;
    }
  }

  editContact(id: string) {
    const contact = this.condo.contacts?.find(contact => contact.id === id);
    if (contact) {
      this.contactForm.patchValue({
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        type: contact.type
      });
      this.showContactForm();
    }
  }

  deleteContact(id: string) {
    const contact = this.condo.contacts?.find(contact => contact.id === id);
    if (contact) {
      this.condo.contacts = this.condo.contacts?.filter(c => c.id !== id);
      this.updateCondo();
    }
  }

}
