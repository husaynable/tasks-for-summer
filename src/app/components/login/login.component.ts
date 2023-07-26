import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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
