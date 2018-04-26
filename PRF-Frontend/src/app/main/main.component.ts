import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NodeService } from '../utils/node.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  message: string;

  constructor(private router: Router, private nodeService: NodeService) {
    this.name = 'default';
    this.email = 'mail.com';
    this.password = 'default';
    this.message = 'no message yet';
  }

  greet() {
    this.nodeService.getGreeting().subscribe(data => {
      this.message = data.result;
    }, error => {
      this.message = error.result;
    });
  }

  register() {
    this.nodeService.registerUser(this.email, this.name, this.password).subscribe(data => {
      this.message = data.toString();
    }, error => {
      this.message = error;
    });
  }

  ngOnInit() {
  }



  navigate() {
    this.router.navigate(["/about"]);
  }

  /*
    main.component.html-t egy sorral:
    <button (click)="navigate()">About</button>
  */

}
