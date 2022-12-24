import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import firebase from 'firebase/compat/app';
import { SubSink } from 'subsink';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public username?: string | null;

  private user?: firebase.User | null;
  private subs: SubSink = new SubSink();

  constructor(private loginService: LoginService, private dialogRef: MatDialogRef<EditUserComponent>) {}

  ngOnInit(): void {
    this.subs.sink = this.loginService.authState.subscribe((user) => {
      this.user = user;
      this.username = user?.displayName;
    });
  }

  apply() {
    this.user?.updateProfile({ displayName: this.username }).then(() => {
      // TODO notify
      // this.notifier.notify('success', 'Profile updated!');
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
