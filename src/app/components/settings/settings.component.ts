import { Component, HostBinding, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @HostBinding('class') classes = '';

  constructor(private loginService: LoginService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  toggle() {
    if (this.classes === 'opened') {
      this.classes = '';
    } else {
      this.classes = 'opened';
    }
  }

  editProfile() {
    this.dialog.open(EditUserComponent);
  }

  logout() {
    this.loginService.logOut();
  }
}
