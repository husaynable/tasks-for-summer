import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatRippleModule, MatIconModule, MatListModule],
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
