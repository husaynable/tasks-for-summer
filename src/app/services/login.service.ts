import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userId?: string;

  constructor(private afAuth: Auth, private router: Router) {}

  get isAuth(): Observable<boolean> {
    return authState(this.afAuth).pipe(map((u) => !!u));
  }

  get authState(): Observable<User | null> {
    return authState(this.afAuth);
  }

  login(login: string, password: string): Promise<UserCredential | null> {
    return signInWithEmailAndPassword(this.afAuth, login, password)
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
    return createUserWithEmailAndPassword(this.afAuth, email, password);
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
