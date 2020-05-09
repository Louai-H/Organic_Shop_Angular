import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login();
  }

  ngOnDestroy() {
    sessionStorage.removeItem('returnBackUrl');
  }

}
