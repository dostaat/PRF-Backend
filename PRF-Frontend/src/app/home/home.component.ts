import { Component, OnInit } from '@angular/core';
 
import { User } from '../_models/user';
import { UserService } from '../utils/user.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
 
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));        
    }
 
    ngOnInit() {
        this.loadAllUsers();
        this.changeButton();
    }
 
    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private changeButton(){
        if (this.currentUser.role === "player"){
            (<HTMLInputElement>document.getElementById("AdminButton")).hidden = true;
            (<HTMLInputElement>document.getElementById("PlayerButton")).hidden = false;
        } 
        else{
            (<HTMLInputElement>document.getElementById("AdminButton")).hidden = false;
            (<HTMLInputElement>document.getElementById("PlayerButton")).hidden = true;
            console.log((<HTMLInputElement>document.getElementById("small_text")) );
            (<HTMLInputElement>document.getElementById("small_text")).textContent = " You logged in as an admin user :)";
        }
    }
    
}
