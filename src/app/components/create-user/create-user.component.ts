import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { updateProfile } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EqualDirective } from '../../directives/validate-equal.directive';
import { NgIf } from '@angular/common';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, FormsModule, EqualDirective, MatCardModule, MatFormFieldModule, MatInputModule],
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
        updateProfile(res.user, { displayName: this.username })
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
