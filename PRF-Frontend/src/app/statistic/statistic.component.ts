import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../utils/user.service';
import { CityService } from '../utils/cities.service';
import { Cities } from '../_models/cities';


@Component({
    moduleId: module.id,
    templateUrl: 'statistic.component.html'
})
 
 
export class StatisticComponent implements OnInit, OnChanges {
    currentUser: User;
    users: User[] = [];
    returnUrl: string;
 
    constructor(private userService: UserService, 
        private citiesService: CityService,
        private route: ActivatedRoute,
        private router: Router,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnChanges() {
        this.loadAllUsers();
    }
 
    ngOnInit() {

        this.loadAllUsers();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }
 
    private loadAllUsers() {
        this.userService.getPlayers().subscribe(users => { 
            this.users = users; 
            this.orderUsersByPoints();
        });
    }
   
    private orderUsersByPoints() {
        this.users.sort((user1, user2) => {
            return user2.score - user1.score;
        })
        console.log(this.users);
    }
}




