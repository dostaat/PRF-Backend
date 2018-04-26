import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../utils/alert.service';
import { NodeService } from '../utils/node.service'; 
 
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: NodeService,
        private alertService: AlertService) { }
 
    register() {
        this.loading = true;
        this.userService.registerUser(this.model.email, this.model.username, this.model.password)
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
