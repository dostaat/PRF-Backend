import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../utils/alert.service';
import { UserService } from '../utils/user.service'; 
 
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

//ide majd meg kell 1 passwordConf is! 
export class RegisterComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
 
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
