import {Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_guards/auth.guard';
import {HomeComponent} from './home/home.component';
import {StatisticComponent} from './statistic/statistic.component';
import {SecureComponent} from './layouts/secure/secure.component';


export const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent}  ,
    {path: 'register', component: RegisterComponent},
    {path: '', component: SecureComponent, canActivate: [AuthGuard], 
        children:
         [
            {path: 'home', component: HomeComponent},
            {path: 'statistic', component: StatisticComponent}, 
         ]
    },
    {path: '', component: SecureComponent, canActivate: [AuthGuard] , data: {roles:['admin']}, 
        children:
         [
            //ide kell majd tenni a quiz kerdes felvetelet meg azokat amiket csak admin role-al szabad elerni
            //{path: 'statistic', component: StatisticComponent}, 
         ]
    }
];

