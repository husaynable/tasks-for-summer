import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userId?: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  get isAuth(): Observable<boolean> {
    return this.afAuth.user.pipe(map((u) => !!u));
  }

  get authState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  login(login: string, password: string): Promise<firebase.auth.UserCredential | null> {
    return this.afAuth
      .signInWithEmailAndPassword(login, password)
      .then((creds) => {
        if (creds) {
          // TODO: notify
          // this.notifier.show({
          //   type: 'success',
          //   message: `Welcome to the List of Tasks for Summer, ${creds.user.displayName}!`
          // });
          this.userId = creds.user?.uid;
        }
        return creds;
      })
      .catch((authError) => {
        // TODO: notify
        // this.notifier.show({ type: 'error', message: authError.message });
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
