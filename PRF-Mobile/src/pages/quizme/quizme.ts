import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Quiz } from '../../_modules/quiz';
import { User } from '../../_modules/user';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../../app/app.config';

@IonicPage()

@Component({
  selector: 'page-quizme',
  templateUrl: 'quizme.html',
})
export class QuizmePage {
  currentUser: User;
  quiz: Quiz;
  questions: Quiz[] = [];
  lost: boolean;
  questionNum: number;
  gamePoints: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  
    this.loadAllQuestions();
  
  }

  private loadAllQuestions() {
    console.log("started reading");
    this.http.get<Quiz[]>(appConfig.apiUrl + '/quiz').subscribe( questions => { 
      this.questions = questions; 
      this.loadRandomQuestion();
    });
  } 

  private loadRandomQuestion() {
    this.http.get<Quiz>(appConfig.apiUrl + '/quiz/random').subscribe( quiz => { 
      this.quiz = quiz; 
      console.log(this.quiz) ;
    });
  }

  checkAnswer(ans: string) {
    if(ans === this.quiz.answer) {/*
      this.currentUser.score += this.quiz.level;
      this.userService.updateScore(this.currentUser).subscribe( currentUser => { (<Object>this.currentUser) = currentUser; } );
      this.gamePoints += this.quiz.level;
      if(this.questionNum < 10) {
        this.questionNum++;
      }
      this.loadRandomQuestion();
      console.log(this.currentUser.score);
    } else {
      this.lost = true;
      this.questionNum = 0;*/
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizmePage');
  }

}
