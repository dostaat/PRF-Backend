import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCityPage } from './new-city';

@NgModule({
  declarations: [
    NewCityPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCityPage),
  ],
})
export class NewCityPageModule {}
