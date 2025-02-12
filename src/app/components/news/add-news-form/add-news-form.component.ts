import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NewsModel } from '../../../model/news.model';
import { NewsService } from '../../../services/news/news.service';
import { SpinnerComponent } from '../../spinner/spinner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { BASE_IMAGE_BASE64 } from '../../../shared/constants/image.constants';

@Component({
  selector: 'app-add-news-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SpinnerComponent,
    ReactiveFormsModule,
    MatIconModule,
    DatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './add-news-form.component.html',
  styleUrl: './add-news-form.component.scss',
})
export class AddNewsFormComponent {
  newsService = inject(NewsService);
  formBuilder = inject(FormBuilder);
  sanitizer = inject(DomSanitizer);
  datePipe = inject(DatePipe);
  
  news: NewsModel = NewsModel.constructorEmpty();
  isEditNews: boolean = false;
  newsForm: FormGroup = new FormGroup({});
  base64Image: string = '';
  formDate: string = '';

  ngOnInit(): void {
    this.createNewsForm();
    this.formDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm') || '';
  }

  createNewsForm() {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: [''],
      image: [BASE_IMAGE_BASE64],
      breaking: [false],
    });
  }

  isFormValid() {
    return this.newsForm.valid;
  }

  onFileSelected($event: { target: { files: any[] } }) {
    const file = $event.target.files[0];
    
    if (file && this.isImageFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        this.newsForm.patchValue({ image: imageDataUrl });
        this.base64Image = imageDataUrl;
      };
      reader.readAsDataURL(file);
    } else {
      this.newsForm.patchValue({ image: '' });
      this.base64Image = '';
    }
  }

  isImageFile(file: File): boolean {
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return imageMimeTypes.includes(file.type);
  }
  

  addNews() {
    console.log('addNews');
    if (this.newsForm.valid) {
      this.news = this.newsForm.value;
      this.news.date = this.formDate;
      this.news.idCondo = localStorage.getItem('id_condo') || '';
      
      this.newsService.addNews(this.news).subscribe((news) => {
        this.goBack();
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
