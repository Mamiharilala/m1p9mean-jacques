import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  typePassword: string;
  constructor() { 
    this.typePassword = "password";
  }

  ngOnInit(): void {
  }
  onClickShowPassword(): void {
    if (this.typePassword == "text") {
      this.typePassword = "password";
    } else {
      this.typePassword = "text";
    }
  } 
}
