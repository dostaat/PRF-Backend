import {Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_guards/auth.guard';
import {HomeComponent} from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { QuizComponent } from './quiz/quiz.component';

export const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'statistic', component: StatisticComponent, canActivate: [AuthGuard]},
    {path: 'quiz', component: QuizComponent},
    {path: '**', component: HomeComponent}
];
