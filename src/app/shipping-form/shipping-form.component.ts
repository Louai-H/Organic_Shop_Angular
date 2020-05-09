import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  
  shipping : any = {}; 
  userSubscription: Subscription ;
  userId: string ;

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe() ;
  }  

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = this.orderService.placeOrder(order) ;
    this.router.navigate(['order-success', result.key]);
  }  

}
