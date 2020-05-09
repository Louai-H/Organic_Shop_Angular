import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './services/user.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(userService: UserService, auth: AuthService , router : Router , route: ActivatedRoute, private db: AngularFireDatabase) {

    auth.user$.subscribe(user => {
      if (!user) return ;
      if (user) {
        userService.save(user);
        let redirectUrl = route.snapshot.queryParamMap.get('redirectUrl') ;
        if ( redirectUrl ) {
          router.navigateByUrl(redirectUrl) ;
        }
      }
    })
  }

}
