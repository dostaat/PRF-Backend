import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../utils/quiz.service';
import { Quiz } from '../_models/quiz';
import { AlertService } from '../utils/alert.service';
import { QuestionsService } from '../utils/questions.service';
import { Questions } from '../_models/questions';

@Component({
  moduleId: module.id,
  templateUrl: 'deletequiz.component.html'
})
export class DeletequizComponent implements OnInit {
  quiz: Quiz;
  questions: Quiz[] = [];
  list: Questions;
  lists: Questions[] = [];
  returnUrl: string;
  tempList: string[] = [];
  newList: Questions;
  
  constructor(private quizService: QuizService,
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.loadAllLists();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private loadAllLists() {
    this.questionsService.getAll().subscribe( lists => { this.lists = lists; });
  }

  deleteQuiz(_id: string) {
    this.questionsService.delete(_id).subscribe( newList => { this.newList = this.newList; } );
    window.alert("List is deleted.");
    this.router.navigateByUrl('/home');
  }

}
