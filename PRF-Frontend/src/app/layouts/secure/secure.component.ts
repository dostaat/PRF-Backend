import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  
  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));  
   }

  ngOnInit() {
    this.chooseMenuItems();
  }
  
  private chooseMenuItems(){
        if (this.currentUser.role === "admin"){
            (<HTMLInputElement>document.getElementById("addNewQuiz")).hidden = false;
        } 
        else{
            (<HTMLInputElement>document.getElementById("addNewQuiz")).hidden = true;
        }
    }

}
