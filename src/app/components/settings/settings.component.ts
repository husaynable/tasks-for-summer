import { Component, HostBinding, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @HostBinding('class') classes = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  toggle() {
    if (this.classes === 'opened') {
      this.classes = '';
    } else {
      this.classes = 'opened';
    }
  }

  logout() {
    this.loginService.logOut();
  }
}
