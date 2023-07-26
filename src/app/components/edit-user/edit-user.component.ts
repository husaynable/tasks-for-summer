import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatDialogRef } from '@angular/material/dialog';
import { updateProfile, User } from '@angular/fire/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class EditUserComponent implements OnInit {
  public username?: string | null;

  private destroyRef = inject(DestroyRef);
  private user?: User | null;

  constructor(private loginService: LoginService, private dialogRef: MatDialogRef<EditUserComponent>) {}

  ngOnInit(): void {
    this.loginService.authState.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.user = user;
      this.username = user?.displayName;
    });
  }

  apply() {
    updateProfile(this.user!, { displayName: this.username }).then(() => {
      // TODO notify
      // this.notifier.notify('success', 'Profile updated!');
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
