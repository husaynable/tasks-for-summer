import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  login: string;
  username: string;
  password: string;
  repeatPassword: string;

  constructor(private loginService: LoginService, private notify: NotifierService, private router: Router) {}

  ngOnInit() {}

  createNew() {
    this.loginService
      .createUser(this.login, this.password)
      .then(res => {
        res.user
          .updateProfile({ displayName: this.username })
          .then(() => {
            this.notify.notify('success', `User "${this.username}" is created successfully!`);
            this.router.navigateByUrl('/');
          })
          .catch(err => {
            console.error(err);
            this.notify.notify(
              'error',
              err && err.message ? err.message : 'Error while setting username. Please try again'
            );
          });
      })
      .catch(err => {
        console.error(err);
        this.notify.notify('error', err && err.message ? err.message : 'Error while creating user. Please try again');
      });
  }
}
