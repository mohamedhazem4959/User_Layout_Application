import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environments';
import { CartService } from '../../services/cart.service';
import { ICartItems } from '../../models/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  constructor(private _productS: ProductService, private _activeRoute: ActivatedRoute, private _cartS: CartService) { }
  product!: IProduct;
  itemQuantity: number = 1
  cartItem: ICartItems | null = null;
  route!: string;
  staticUrl = environment.uploadsUrl + '/';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe(param => {
      this.route = param.get('route')!;
      this._productS.getProductByRoute(this.route).subscribe({
        next: res => {
          this.product = res.data
          console.log('Fetched product:', this.product);
          this.cartItem = { productId: this.product._id, quantity: this.itemQuantity }
        },
        error: err => console.error(err)
      })
    })
  }

  updateQuantity(newQuantity: number): void {
    this.itemQuantity = newQuantity;
    if (this.product) {
      this.cartItem = {
        productId: this.product._id,
        quantity: this.itemQuantity,
      };
    }
  }

  addToCart() {
    if (!this.cartItem) {
      this.errorMessage = 'Cannot add to cart: Product not loaded';
      return;
    }
    this._cartS.addToCart(this.cartItem).subscribe({
      next: res => {
        this.successMessage = 'Product Added To Cart'
        console.log('Added to cart: ', res);
      },
      error: err => {
        console.error(err)
        this.errorMessage = 'Error adding product into cart'
      }
    })
  }
}
