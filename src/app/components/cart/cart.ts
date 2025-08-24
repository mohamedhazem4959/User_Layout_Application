import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ICartItemResponse, ICartItems, ICartRes } from '../../models/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,CommonModule,RouterLinkActive],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{
  cartItem: ICartItemResponse[] | null = null;
  errorMessage: string | null = null;
  constructor(private _cartS:CartService){ }

  ngOnInit(): void {
    this._cartS.getItemsInCart().subscribe({
      next: (res:ICartRes) => {
        this.cartItem = res.data.items;
        console.log('Cart Items: ', this.cartItem);
      },
      error: err => {
        this.errorMessage = err.message || 'Failed to load products into the cart '
        console.log('Error fetching items: ' , err);
      }
    })
  }
  get totalQuantity(): number {
    return this.cartItem?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }

  get totalPrice(): number {
    return this.cartItem?.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0;
  }

  removeItem(productId: string): void {
    if (this.cartItem) {
      this.cartItem = this.cartItem.filter(item => item.product._id !== productId);
      console.log('Item removed, new cart:', this.cartItem);
      // TODO: Call backend to update cart (e.g., _cartS.removeItem(productId))
    }
  }
  
}
