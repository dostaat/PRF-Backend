import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {appRoutes} from './app.routes';

import { AuthGuard } from './_guards/auth.guard';
import { NodeService } from './utils/node.service';
import { AuthenticationService } from './utils/authentication.service';
import { UserService } from './utils/user.service';
import { JwtInterceptorProvider } from './_helpers/jwt.interceptor';
import { ErrorInterceptorProvider } from './_helpers/error.interceptor';
import { AlertService } from './utils/alert.service';

import { AppComponent } from './app.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatisticComponent } from './statistic/statistic.component';
import { CityService } from './utils/cities.service';
import { SecureComponent } from './layouts/secure/secure.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './utils/quiz.service';
import { QuestionsService } from './utils/questions.service';
import { QuestionsComponent } from './questions/questions.component';
import { NewquizComponent } from './newquiz/newquiz.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StatisticComponent,
    QuizComponent,
    SecureComponent,
    QuestionsComponent,
    NewquizComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
        AuthGuard,
        NodeService,
        AuthenticationService,
        AlertService,
        UserService,
        CityService,
        QuizService,
        QuestionsService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
