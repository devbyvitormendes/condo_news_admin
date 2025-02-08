import { Component, inject, OnInit } from '@angular/core';
import { NewsModel } from '../../model/news.model';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { NewsService } from '../../services/news/news.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    DatePipe,
    RouterModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  breakingNewsDataSource: MatTableDataSource<NewsModel> =
    new MatTableDataSource();
  newsDataSource: MatTableDataSource<NewsModel> = new MatTableDataSource();

  newsService = inject(NewsService);
  spinnerService = inject(SpinnerService);
  router = inject(Router);

  displayedColumnsBreaking: string[] = [
    'created',
    'title',
    'content',
    'actions',
  ];
  displayedColumns: string[] = [
    'created',
    'title',
    'content',
    'important',
    'actions',
  ];
  currentPage: number = 0;

  ngOnInit(): void {
    this.getBreakingNews();
    this.getNews();
  }

  reload() {
    this.getBreakingNews();
    this.getNews();
  }

  getBreakingNews() {
    this.newsService.getBreakingNews().subscribe((response) => {
      this.breakingNewsDataSource.data = response.content;
    });
  }

  getNews() {
    this.newsService.getNews().subscribe((response) => {
      this.newsDataSource.data = response.content;
    });
  }

  editNews(id: string) {
    this.router.navigate(['news/edit', id]);
  }

  deleteNews(id: string) {
    this.newsService.deleteNews(id).subscribe(() => {
      this.getBreakingNews();
      this.getNews();
    });
  }

  addNews() {
    this.router.navigate(['news/add']);
  }
}
