import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ICartItemResponse, ICartItems, ICartRes } from '../../models/cart.model';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItem: ICartItemResponse[] | null = null;


  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(private _cartS: CartService, private _router:Router) { }

  quantity: number = 0;
  product: IProduct | null = null
  ngOnInit(): void {
    this._cartS.getItemsInCart().subscribe({
      next: (res: ICartRes) => {
        this.cartItem = res.data.items;
        console.log('Cart Items: ', this.cartItem);
      },
      error: err => {
        console.log('Error fetching items: ', err);
      }
    })
  }


  addQuantity(itemQuantity: number) {
    this.quantity = itemQuantity
    return this.quantity++;
  }
  minuseQuantity(itemQuantity: number) {
    this.quantity = itemQuantity
    return this.quantity--;
  }


  updateQuantityBtn(source: string, route: string, currentQuantity: number, productId: string): void {
    let newQuantity = currentQuantity;
    if (source === 'addBtn') {
      newQuantity += 1;
    } else if (source === 'minBtn') {
      newQuantity = Math.max(1, currentQuantity - 1);
    } else {
      this.errorMessage = 'Invalid button source';
      return;
    }

    if (this.cartItem) {
      const item = this.cartItem.find((i) => i.product._id === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    }

    this._cartS.updateQuantity(newQuantity, route).subscribe({
      next: (res: ICartRes) => {
        console.log('Quantity updated:', res);
        this.cartItem = res.data.items;
        this.errorMessage = null;
      },
      error: (err) => {
        if (this.cartItem) {
          const item = this.cartItem.find((i) => i.product._id === productId);
          if (item) {
            item.quantity = currentQuantity;
          }
        }
        this.errorMessage = err.error?.message || 'Failed to update quantity';
        console.error('Error updating quantity:', err);
      }
    });
  }

  removeItem(route: string) {
    const originalCart = this.cartItem ? [...this.cartItem] : null;
    this._cartS.removeItem(route).subscribe({
      next: (res: ICartRes) => {
        this.cartItem = res.data.items;
        this.errorMessage = null;
        console.log('item removed', res.msg, res.data)
      },
      error: (err) => {
        this.cartItem = originalCart
        this.errorMessage = err.message || 'Failed to remove item';
        console.log('Failed to remove item: ', err)
      }
    })
  }
orderId = {}
  proceedToOrder(){
    this._cartS.proceedToOrder().subscribe({
      next: (res:ICartRes) =>{
        this.orderId = res.data._id
        console.log('Full API Response:', res);
        console.log('orderId', this.orderId);
        console.log('order created: ', res.msg , res.data);
        this._router.navigate(['/order', this.orderId]);
      },
      error: err => {
        console.log('can not make order ' , err);
      }
    })
  }

acceptNewPrice(item: ICartItemResponse) {
  item.price = item.product.price;
  item.isChanged = false;
  this._cartS.updatedPrice(item.product.name, item.product.price).subscribe({
    next: res => {
      console.log(res);
    },
    error: err => {
      console.log(err)
    }
  })
}

  get totalQuantity(): number {
    return this.cartItem?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }

  get totalPrice(): number {
    return this.cartItem?.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0;
  }

}
