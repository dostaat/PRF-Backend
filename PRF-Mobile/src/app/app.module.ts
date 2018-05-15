import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QuizmePage } from '../pages/quizme/quizme';
import { Geolocation } from '@ionic-native/geolocation';
import { NewCityPage} from '../pages/new-city/new-city';
import { NameConvert } from "../Utils/nameConverter";
import { AlertController } from 'ionic-angular';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    QuizmePage,
    NewCityPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    QuizmePage,
    NewCityPage
  ],
  providers: [
    AlertController,
    Geolocation,
    StatusBar,
    SplashScreen,
    NameConvert,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
