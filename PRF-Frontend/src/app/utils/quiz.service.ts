import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Quiz } from '../_models/quiz';

@Injectable()
export class QuizService {
    constructor(private http: HttpClient) {
     }

    getAll() {
        console.log("a quiz keres elment");
        return this.http.get<Quiz[]>(appConfig.apiUrl + '/quiz');
    }

    getRandomQuestion() {
        return this.http.get<Quiz>(appConfig.apiUrl + '/quiz/random');
    }

    getById(_id: string) {
        return this.http.post<Quiz>(appConfig.apiUrl + '/quiz/one', {"id": _id});
    }
}
