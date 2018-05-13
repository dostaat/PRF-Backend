import { Component } from '@angular/core';
import { appConfig } from './app.config';

console.log(appConfig.apiUrl);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';  
  
  setUrl() {
    var newUrl = prompt("Please enter the new URL for the server!",appConfig.apiUrl);
    if (newUrl !== null) {
      appConfig.apiUrl = newUrl;
    }    
    console.log(appConfig.apiUrl);
  }
}
