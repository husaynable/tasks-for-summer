import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    this.loginService.login(this.login, this.password)
      .then(creds => {
        if (creds) {
          this.router.navigate(['']);
        }
      });
  }

  logOut() {
    this.loginService.logOut();
  }
}
