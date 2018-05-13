import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../utils/user.service';
import { QuizService } from '../utils/quiz.service';
import { Quiz } from '../_models/quiz';


@Component({
  moduleId: module.id,
  templateUrl: 'quiz.component.html'
})


export class QuizComponent implements OnInit {
  currentUser: User;
  quiz: Quiz;
  questions: Quiz[] = [];
  returnUrl: string;

  constructor(private userService: UserService, 
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

}
