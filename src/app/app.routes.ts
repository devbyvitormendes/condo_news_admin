import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CondoComponent } from './components/condo/condo.component';
import { NewsComponent } from './components/news/news.component';
import { ResidentsComponent } from './components/residents/residents.component';

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
        component: HomeComponent
    },
    {
        path: 'condo',
        component: CondoComponent
    },
    {
        path: 'news',
        component: NewsComponent
    },
    {
        path: 'residents',
        component: ResidentsComponent
    }
];
