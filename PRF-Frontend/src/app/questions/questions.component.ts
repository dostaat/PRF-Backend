import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../utils/user.service';
import { QuizService } from '../utils/quiz.service';
import { Quiz } from '../_models/quiz';
import { AlertService } from '../utils/alert.service';
import { QuestionsService } from '../utils/questions.service';
import { Questions } from '../_models/questions';


@Component({
  moduleId: module.id,
  templateUrl: 'questions.component.html'
})

export class QuestionsComponent implements OnInit {
  currentUser: User;
  quiz: Quiz;
  questions: Quiz[] = [];
  list: Questions;
  lists: Questions[] = [];
  returnUrl: string;
  inGame: boolean;
  quizLength: number;
  gamePoints: number;

  constructor(private userService: UserService, 
    private quizService: QuizService,
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.inGame = false;
  }

  ngOnInit() {
    this.loadAllLists();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  private loadAllLists() {
    this.questionsService.getAll().subscribe( lists => { this.lists = lists; });
  } 
  
  private loadOneQuestion(_id: string) {
    this.quizService.getById(_id).subscribe( quiz => { this.quiz = quiz; });
  } 

  startQuiz(_id: string) {
    this.inGame = true;
    this.quizLength = 0;
    this.gamePoints = 0;
    this.questionsService.getById(_id).subscribe( list => { this.list = list; 
      this.loadOneQuestion(this.list.list[this.quizLength]);
      this.quizLength++; });
  }

  checkAnswer(ans: string) {
    if(ans === this.quiz.answer) {
      this.currentUser.score += this.quiz.level;
      this.userService.updateScore(this.currentUser).subscribe( currentUser => { (<Object>this.currentUser) = currentUser; } );
      this.gamePoints += this.quiz.level;
      if(this.quizLength < this.list.list.length) {
        this.loadOneQuestion(this.list.list[this.quizLength]);
        this.quizLength++
      } else {
        this.inGame = false;
        window.alert("Congratulations, you've earned " + this.gamePoints + " points!");
        this.router.navigateByUrl('/questions');
      }
    } else {
      this.inGame = false;
      window.alert("Congratulations, you've earned " + this.gamePoints + " points!");
      this.router.navigateByUrl('/questions');
    }
  }

}
