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
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
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
        JwtInterceptorProvider,
        ErrorInterceptorProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
