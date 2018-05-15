import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Questions } from '../_models/questions';

@Injectable()
export class QuestionsService {
    constructor(private http: HttpClient) { 
    }

    getAll() {
        console.log("a keres elment de úgy ám");
        return this.http.get<Questions[]>(appConfig.apiUrl + '/questions');
    }

    getById(_id: string) {
        return this.http.post<Questions>(appConfig.apiUrl + '/questions/one', {"id": _id});
    }

}
