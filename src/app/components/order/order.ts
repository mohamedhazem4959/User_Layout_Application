import { Component, OnInit } from '@angular/core';
import { IOrderItemsResponse, IOrderRes } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { IProduct } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICartRes } from '../../models/cart.model';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit {
  orderItem: IOrderItemsResponse[] | null = null;

  
  errorMessage: string | null = null;
  orderId: string | null = null
  constructor(private _orderS: OrderService, private _route: ActivatedRoute) { }

  product: IProduct | null = null;
  ngOnInit(): void {
    this.orderId = this._route.snapshot.paramMap.get('id');
    console.log('OrderID: ', this.orderId)

      this._orderS.getCartItems().subscribe({
        next: (res: ICartRes) => {
          this.orderItem = res.data.items;
          console.log('Order Items: ', this.orderItem);
        },
        error: err => {
          this.errorMessage = err.message || 'Failed to load products into the order.'
          console.log('Error fetching items: ', err);
        }
      })
  }

  getOrderIdFn(orderId: string) {
    return this.orderId = orderId
  }
  shippingAdress: string = ''
  successMessage: string | null = null;

  placeOrder() {
    this._orderS.placeOrder(this.shippingAdress).subscribe({
      next: (res: IOrderRes) => {
        console.log('Order placed successfully: ', res);
        this.successMessage = 'Order placed successfully!';
        this.errorMessage = null;
      },
      error: err => {
        console.log('Error placing order: ', err);
        this.errorMessage = 'Failed to place order. Please try again.';
        this.successMessage = null; 
      }
    })
  }

  get totalQuantity(): number {
  return this.orderItem?.reduce((acc, item) => acc + item.quantity, 0) || 0;
}

get totalPrice(): number {
  return this.orderItem?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
}

}
