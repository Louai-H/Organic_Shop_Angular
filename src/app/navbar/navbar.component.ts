import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable, of } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart> = of(new ShoppingCart({}));

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = this.shoppingCartService.getCart();

  }

  navigateToLogin() {
    let returnBackUrl = this.router.url;
    if (returnBackUrl != "/login") {
      sessionStorage.setItem('returnBackUrl', returnBackUrl);
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth.logout();
  }

}