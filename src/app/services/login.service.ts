import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userId: string;

  constructor(private afAuth: AngularFireAuth, private notifier: NotifierService, private router: Router) {}

  get isAuth(): Observable<boolean> {
    return this.afAuth.user.pipe(map(u => !!u));
  }

  get authState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  login(login: string, password: string): Promise<firebase.auth.UserCredential | null> {
    return this.afAuth
      .signInWithEmailAndPassword(login, password)
      .then(creds => {
        if (creds) {
          this.notifier.show({
            type: 'success',
            message: `Welcome to the List of Tasks for Summer, ${creds.user.displayName}!`
          });
          this.userId = creds.user.uid;
        }
        return creds;
      })
      .catch(authError => {
        this.notifier.show({ type: 'error', message: authError.message });
        return null;
      });
  }

  logOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  createUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  getUserId() {
    if (this.userId) {
      return this.userId;
    } else {
      throw new Error('user is not logged in');
    }
  }

  setUserId(userId: string) {
    this.userId = userId;
  }
}
