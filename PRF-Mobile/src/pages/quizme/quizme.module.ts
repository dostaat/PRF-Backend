import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizmePage } from './quizme';

@NgModule({
  declarations: [
    QuizmePage,
  ],
  imports: [
    IonicPageModule.forChild(QuizmePage),
  ],
})
export class QuizmePageModule {}
