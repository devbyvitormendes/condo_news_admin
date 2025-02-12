import { Component, inject, Input } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';

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
  ],
  providers: [DatePipe],
  templateUrl: './update-news-form.component.html',
  styleUrl: './update-news-form.component.scss',
})
export class UpdateNewsFormComponent {
  newsService = inject(NewsService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  sanitizer = inject(DomSanitizer);
  
  news: NewsModel = NewsModel.constructorEmpty();
  isEditNews: boolean = false;
  newsForm: FormGroup = new FormGroup({});

  @Input() set newsValue(id: string) {
    this.newsService.getNewsById(id).subscribe((response) => {
      this.news = response;
      this.patchNewsForm();
    });
  }

  ngOnInit(): void {
    this.createNewsForm();

    this.newsService
      .getNewsById(this.route.snapshot.params['id'])
      .subscribe((response) => {
        this.news = response;
        this.patchNewsForm();
      });
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

  editNews() {
    this.isEditNews = true;
  }

  cancel() {
    this.isEditNews = false;
    this.patchNewsForm();
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

  updateNews() {
    if (this.isFormValid()) {
      const newsUpdate: NewsModel = this.newsForm.value;
      newsUpdate.id = this.news.id;
      newsUpdate.date = this.news.date;
      newsUpdate.idCondo = this.news.idCondo;

      this.newsService.updateNews(newsUpdate).subscribe((response) => {
        this.news = response;
        this.isEditNews = false;
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
