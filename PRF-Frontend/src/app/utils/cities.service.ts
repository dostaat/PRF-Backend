import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Cities } from '../_models/cities';

@Injectable()
export class CityService {
    constructor(private http: HttpClient) { 
    }

    getAll() {
        console.log("a keres elment de úgy ám");
        return this.http.get<Cities[]>(appConfig.apiUrl + '/cities');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/cities/' + _id);
    }

    update(city: Cities) {
        return this.http.put(appConfig.apiUrl + '/cities/' + city._id, city);
    }

}
