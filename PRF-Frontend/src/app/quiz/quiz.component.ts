import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../utils/user.service';
import { QuizService } from '../utils/quiz.service';
import { Quiz } from '../_models/quiz';
import { AlertService } from '../utils/alert.service';


@Component({
  moduleId: module.id,
  templateUrl: 'quiz.component.html'
})


export class QuizComponent implements OnInit {
  currentUser: User;
  quiz: Quiz;
  questions: Quiz[] = [];
  returnUrl: string;
  lost: boolean;
  questionNum: number;
  gamePoints: number;

  constructor(private userService: UserService, 
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.lost = false;
    this.questionNum = 1;
    this.gamePoints = 0;
  }

  ngOnInit() {

    this.loadAllQuestions();
    this.loadRandomQuestion();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  private loadAllQuestions() {
      this.quizService.getAll().subscribe( questions => { this.questions = questions; });
  } 

  private loadRandomQuestion() {
    this.quizService.getRandomQuestion().subscribe( quiz => { this.quiz = quiz;  });
  }

  checkAnswer(ans: string) {
    if(ans === this.quiz.answer) {
      this.currentUser.score += this.quiz.level;
      this.userService.update(this.currentUser).subscribe( currentUser => { (<Object>this.currentUser) = currentUser; } );
      this.gamePoints += this.quiz.level;
      if(this.questionNum < 10) {
        this.questionNum++;
      }
      this.loadRandomQuestion();
      console.log(this.currentUser.score);
    } else {
      this.lost = true;
      this.questionNum = 0;
    }
  }

  reset() {
    this.lost = false;
    this.questionNum = 0;
    this.gamePoints = 0;
    this.loadRandomQuestion();
  }

}
