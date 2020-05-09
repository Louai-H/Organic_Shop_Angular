import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  id: string;
  cart: any;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => { this.product = p });
  }

  ngOnInit() {
    this.subscription = this.shoppingCartService.getCart().subscribe(cart => this.cart = cart);
  }


  navigateHome() {
    let homeUrl = sessionStorage.getItem("homeFilteredUrl") || '/';
    this.router.navigateByUrl(homeUrl);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    sessionStorage.removeItem("homeFilteredUrl")
  }

}
