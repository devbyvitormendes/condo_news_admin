import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CondoComponent } from './components/condo/condo.component';
import { NewsComponent } from './components/news/news.component';
import { ResidentsComponent } from './components/residents/residents.component';
import { ResidentFormComponent } from './components/residents/resident-form/resident-form.component';
import { NewsFormComponent } from './components/news/news-form/news-form.component';  

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'condo',
        component: CondoComponent,
    },
    {
        path: 'news',
        component: NewsComponent,
    },
    {
        path: 'news/add',
        component: NewsFormComponent,
    },
    {
        path: 'news/edit/:id',
        component: NewsFormComponent,
    },
    {
        path: 'residents',
        component: ResidentsComponent,
    },
    {
        path: 'residents/add',
        component: ResidentFormComponent,
    },
    {
        path: 'residents/edit/:id',
        component: ResidentFormComponent,
    }
];
