import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NewsModel } from '../../model/news.model';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { NewsService } from '../../services/news/news.service';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { ToastComponent } from '../ui/toast/toast.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
    ToastComponent,
    MatPaginatorModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  breakingNewsDataSource: MatTableDataSource<NewsModel> =
    new MatTableDataSource();
  newsDataSource: MatTableDataSource<NewsModel> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginatorBreaking!: MatPaginator;
  @ViewChild(MatPaginator) paginatorNews!: MatPaginator;
  
  newsService = inject(NewsService);
  spinnerService = inject(SpinnerService);
  toastService = inject(ToastService);
  router = inject(Router);

  displayedColumnsBreaking: string[] = [
    'created',
    'updatedAt',
    'title',
    'content',
    'actions',
  ];
  displayedColumns: string[] = [
    'created',
    'updatedAt',
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
      this.breakingNewsDataSource.paginator = this.paginatorBreaking;
    });
  }

  getNews() {
    this.newsService.getNews().subscribe((response) => {
      this.newsDataSource.data = response.content;
      this.newsDataSource.paginator = this.paginatorNews;
    });
  }

  editNews(id: string) {
    this.router.navigate(['news/edit', id]);
  }

  deleteNews(id: string) {
    this.newsService.deleteNews(id).subscribe({
      next: () => {
        this.toastService.success('Excluída', 'Notícia excluída com sucesso');
        this.getBreakingNews();
        this.getNews();
      },
      error: (error) => {
        this.toastService.error('Erro', 'Erro ao excluir notícia');
        console.error('Error deleting news:', error);
      }
    });
  }

  addNews() {
    this.router.navigate(['news/add']);
  }
}
