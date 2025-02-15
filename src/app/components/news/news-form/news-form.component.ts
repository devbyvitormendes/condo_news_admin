import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NewsModel } from '../../../model/news.model';
import { NewsService } from '../../../services/news/news.service';
import { SpinnerComponent } from '../../ui/spinner/spinner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { ToastService } from '../../../services/toast/toast.service';
import { ToastComponent } from '../../ui/toast/toast.component';

@Component({
  selector: 'app-update-news-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SpinnerComponent,
    ReactiveFormsModule,
    MatIconModule,
    DatePipe,
    ToastComponent,
  ],
  providers: [DatePipe, ToastService],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss',
})
export class NewsFormComponent {
  newsService = inject(NewsService);
  toastService = inject(ToastService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  sanitizer = inject(DomSanitizer);
  datePipe = inject(DatePipe);
  
  news: NewsModel = NewsModel.constructorEmpty();
  isEditNews: boolean = false;
  newsForm: FormGroup = new FormGroup({});
  formDate: string = '';

  ngOnInit(): void {
    this.createNewsForm();
    if (this.route.snapshot.params['id']) {
      this.isEditNews = true;
      this.formDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm') || '';
      this.newsService
        .getNewsById(this.route.snapshot.params['id'])
      .subscribe((response) => {
        this.news = response;
        this.patchNewsForm();
      });
    }
  }

  createNewsForm() {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: [''],
      image: [''],
      breaking: [false],
    });
  }

  patchNewsForm() {
    this.newsForm.patchValue({
      title: this.news.title,
      content: this.news.content,
      image: this.news.image,
      breaking: this.news.breaking,
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
      };
      reader.readAsDataURL(file);
    } else {
      this.newsForm.patchValue({ image: '' });
    }
  }

  isImageFile(file: File): boolean {
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return imageMimeTypes.includes(file.type);
  }

  saveNews() {
    if (this.isEditNews) {
      this.updateNews();
    } else {
      this.addNews();
    }
  }

  addNews() {
    if (this.newsForm.valid) {
      this.news = this.newsForm.value;
      this.news.date = this.formDate;
      this.news.idCondo = localStorage.getItem('id_condo') || '';
      
      this.newsService.addNews(this.news).subscribe({
        next: () => {
          this.toastService.success('Criada', 'Notícia criada com sucesso');
          this.goBack();
        },
        error: (error) => {
          this.toastService.error('Erro', 'Erro ao criar notícia');
          console.error('Error adding news:', error);
        }
      });
    }
  }

  updateNews() {
    if (this.isFormValid()) {
      const newsUpdate: NewsModel = this.newsForm.value;
      newsUpdate.id = this.news.id;
      newsUpdate.date = this.news.date;
      newsUpdate.idCondo = this.news.idCondo;

      this.newsService.updateNews(newsUpdate).subscribe({
        next: () => {
          this.toastService.success('Atualizada', 'Notícia atualizada com sucesso');
          // this.goBack();
        },
        error: (error) => {
          this.toastService.error('Erro', 'Erro ao atualizar notícia');
          console.error('Error updating news:', error);
        }
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
