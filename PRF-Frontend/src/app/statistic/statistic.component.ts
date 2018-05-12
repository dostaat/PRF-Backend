import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../utils/user.service';
import { CityService } from '../utils/cities.service';
import { Cities } from '../_models/cities';


@Component({
    moduleId: module.id,
    templateUrl: 'statistic.component.html'
})
 
 
export class StatisticComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    cities: Cities[] = [];
    returnUrl: string;
 
    constructor(private userService: UserService, 
        private citiesService: CityService,
        private route: ActivatedRoute,
        private router: Router,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {

        this.loadAllUsers();
        this.loadAllCities();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadAllCities() {
        this.citiesService.getAll().subscribe(cities => { this.cities = cities; });
    }    
}
