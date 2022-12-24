import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login?: string;
  password?: string;

  constructor(private loginService: LoginService, private router: Router) {}

  logIn() {
    if (!this.login || !this.password) {
      return;
    }

    this.loginService.login(this.login, this.password).then((credentials) => {
      if (credentials && credentials.user) {
        this.loginService.setUserId(credentials.user.uid);
        this.router.navigate(['']);
      }
    });
  }

  logOut() {
    this.loginService.logOut();
  }

  createNew() {
    this.router.navigateByUrl('/create-user');
  }
}
