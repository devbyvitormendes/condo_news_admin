import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NewsModel } from '../../../model/news/news.model';
import { NewsService } from '../../../services/news/news.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss',
})
export class NewsFormComponent {
  readonly dialogRef = inject(MatDialogRef<NewsFormComponent>);
  newsService = inject(NewsService);

  news: NewsModel = NewsModel.constructorEmpty();

  close(): void {
    this.dialogRef.close();
  }

  addNews(): void {
    this.newsService.addNews(this.news).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
