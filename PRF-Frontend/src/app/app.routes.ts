import {Routes} from '@angular/router';

import {MainComponent} from './main/main.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_guards/auth.guard';
import {HomeComponent} from './home/home.component';

export const appRoutes: Routes = [
    {path: 'main', component: MainComponent},
    {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    
    {path: '**', component: MainComponent}
];
