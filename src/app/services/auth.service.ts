import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnBackUrl = sessionStorage.getItem('returnBackUrl');

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    if (returnBackUrl) { this.router.navigateByUrl(returnBackUrl); }
  }

  logout() {
    this.afAuth.auth.signOut();

    // to redirect home in case the current page was guarded by auth-guard/admin-auth-guard and then loged out:
    let guardedRoute: boolean = (this.router.url.includes("admin") || (this.router.url.includes("order")) || (this.router.url === "/check-out"));   // check if the current route is guarded or not
    if (guardedRoute) { this.router.navigate(['']); }
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();

      return of(null);
    }));
  }
}
