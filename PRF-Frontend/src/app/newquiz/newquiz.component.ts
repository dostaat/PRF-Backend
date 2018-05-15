import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../utils/quiz.service';
import { Quiz } from '../_models/quiz';
import { AlertService } from '../utils/alert.service';
import { QuestionsService } from '../utils/questions.service';
import { Questions } from '../_models/questions';

@Component({
  moduleId: module.id,
  templateUrl: 'newquiz.component.html'
})
export class NewquizComponent implements OnInit {
  quiz: Quiz;
  questions: Quiz[] = [];
  list: Questions;
  newname: string;
  lists: Questions[] = [];
  returnUrl: string;
  tempList: string[] = [];
  newList: Questions;
  
  constructor(private quizService: QuizService,
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {
      this.newname = "";
      this.newList = new Questions();
      this.newList.list = new Array;
  }

  ngOnInit() {
    this.loadAllQuestions();
    this.loadAllLists();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private loadAllLists() {
    this.questionsService.getAll().subscribe( lists => { this.lists = lists; });
  }

  private loadAllQuestions() {
    this.quizService.getAll().subscribe( questions => { this.questions = questions; });
  }

  addNew(_id: string) {
    this.tempList.push(_id);
    console.log(this.tempList);
  }

  save(newname: string) {
    this.newList.name = newname;
    for(let oneItem of this.tempList) {
      this.newList.list.push(oneItem);
    }
    this.questionsService.create(this.newList).subscribe( newList => { this.newList = this.newList; } );
    window.alert("New list saved, with the name " + this.newname);
    this.router.navigateByUrl('/home');
  }

}
