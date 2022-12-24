import { Component, HostBinding } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  @HostBinding('class') classes = '';

  constructor(private loginService: LoginService, private dialog: MatDialog) {}

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
