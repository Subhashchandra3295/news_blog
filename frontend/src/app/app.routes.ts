import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddpostsComponent } from './admin/addpost/addpost.component';
import { ArticlesComponent } from './admin/articles/articles.component';
import { UsersComponent } from './admin/user/user.component';
import { LoginComponent } from './login/login/login.component';
import { HomepageComponent } from './view/homepage/homepage.component';
import { authGuard } from './authentication/auth.guard';
import { userauthGuard } from './authentication/userauth.guard';
// import { HeaderComponent } from './header/header.component';{ addneimport { AddnewsComponent } from './registeruser/addnews/addnews.component';}
import { AddnewsComponent } from './registeruser/addnews/addnews.component';


export const routes: Routes = [
    { path: '',title:"Home Page", component: HomepageComponent },
    { path: 'addposts',title:"Add Posts Page", component: AddpostsComponent, canActivate: [authGuard] },
    { path: 'articles',title:"Articles Page", component: ArticlesComponent, canActivate: [authGuard] },
    { path: 'users',title:"Users Page", component: UsersComponent , canActivate: [authGuard]},
    { path: 'login',title:"Login Page", component: LoginComponent },
    { path: 'admindashboard',title:"Dashboard Page", component: DashboardComponent , canActivate: [authGuard]},
    // { path: 'header',title:"header Page", component: HeaderComponent },
    { path: 'useraddnews',title:"Login Page", component: AddnewsComponent, canActivate: [userauthGuard] },
];
