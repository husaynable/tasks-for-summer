import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor(private loginService: LoginService) {}

  logOut() {
    this.loginService.logOut();
  }
}
