import { inject } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { User } from '@angular/fire/auth';

export function loginGuard(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  return loginService.authState.pipe(
    map((user: User | null) => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }
      loginService.setUserId(user.uid);
      return true;
    })
  );
}
