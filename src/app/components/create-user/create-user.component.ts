import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  login: string | undefined;
  username: string | undefined;
  password: string | undefined;
  repeatPassword: string | undefined;

  constructor(private loginService: LoginService, private router: Router) {}

  createNew() {
    if (!this.login || !this.password) {
      return;
    }

    this.loginService
      .createUser(this.login, this.password)
      .then((res) => {
        res.user
          ?.updateProfile({ displayName: this.username })
          .then(() => {
            // TODO notify
            // this.notify.notify('success', `User "${this.username}" is created successfully!`);
            this.router.navigateByUrl('/');
          })
          .catch((err) => {
            console.error(err);
            // TODO notify
            // this.notify.notify(
            //   'error',
            //   err && err.message ? err.message : 'Error while setting username. Please try again'
            // );
          });
      })
      .catch((err) => {
        console.error(err);
        // TODO notify
        // this.notify.notify('error', err && err.message ? err.message : 'Error while creating user. Please try again');
      });
  }
}
