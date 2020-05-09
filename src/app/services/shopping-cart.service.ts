import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators'
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  getCart() : Observable<ShoppingCart>  {
    let cartId =  this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .snapshotChanges().pipe(map( x => new ShoppingCart(x.payload.exportVal().items) ) );
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product,1) ;
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product,-1) ;
  }

  clearCart() {
    let cartId =  this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    }) ;
  }

  private getOrCreateCartId() : string {
    let cartId = sessionStorage.getItem('cartId');
    if (cartId) return cartId ;

    let result = this.create();
    sessionStorage.setItem('cartId', result.key) ;
    return result.key ;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<any>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private updateItemQuantity(product: Product , change: number) {
    let cartId = this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)
    let item$$ = item$.valueChanges();
    item$$.pipe(take(1)).subscribe((item: any)  => {
      if (item !=null) {
        if ((item.quantity + change)===0) item$.remove()
        else item$.update({quantity: item.quantity + change});
      } 
      else item$.set({product: product , quantity: 1});
    });
  }

}
