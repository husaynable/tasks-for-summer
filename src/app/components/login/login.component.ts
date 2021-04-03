import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  repeatPassword: string;
  isCreatingUser = false;

  constructor(private loginService: LoginService, private router: Router, private notify: NotifierService) {}

  ngOnInit() {}

  logIn() {
    if (!this.isCreatingUser) {
      this.loginService.login(this.login, this.password).then(creds => {
        if (creds) {
          this.router.navigate(['']);
        }
      });
    }
  }

  logOut() {
    this.loginService.logOut();
  }

  createNew() {
    if (!this.isCreatingUser) {
      this.isCreatingUser = true;
      this.login = '';
      this.password = '';
      this.repeatPassword = '';
      return;
    }

    this.loginService
      .createUser(this.login, this.password)
      .then(res => {
        this.notify.notify('success', `User "${this.login}" is created successfully!`);
        this.isCreatingUser = false;
      })
      .catch(err => {
        console.error(err);
        this.notify.notify('error', err && err.message ? err.message : 'Error while creating user. Please try again');
      });
  }
}
