import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../app.config';

@Injectable()
export class NodeService {

  constructor(private http: HttpClient) { }

  getGreeting(): Observable<any> {
    return this.http.get(appConfig.apiUrl+'/rest/user/greeting');
  }

  registerUser(email: string, username: string, password: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('email', email);
    body.set('username', username);
    body.set('password', password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 
      'application/x-www-form-urlencoded')
    };
    return this.http.post(appConfig.apiUrl+'/rest/user/register', 
    body.toString(), options);
  }

}
