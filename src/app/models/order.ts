import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
    datePlaced : number ;
    items : any[] =[] ;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart){
        this.datePlaced = new Date().getTime();

        let shoppingCartItems : ShoppingCartItem[] = shoppingCart.items;

        for (let item in shoppingCartItems) {
        let x = shoppingCartItems[item] ;
        let y = {
            product: {
                title: x.product.title,
                imageUrl: x.product.imageUrl,
                price: x.product.price
            },
            quantity: x.quantity,
            totalPrice: x.totalPrice
        };
        this.items.push(y);
        }


    }
}