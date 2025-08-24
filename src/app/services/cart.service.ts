import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart, ICartItems, ICartRes } from '../models/cart.model';
import { environment } from '../../environments/environments';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _http:HttpClient , private _auth:AuthService, private _router:Router){ }
  
  cartURL = 'http://localhost:3000/api/cart'

  getItemsInCart(): Observable<ICartRes> {
    const token = this._auth.getAuthToken();
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this._http.get<ICartRes>(this.cartURL, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          this._router.navigate(['/login']);
          return throwError(() => new Error('Unauthorized. Please log in again.'));
        }
        return throwError(() => new Error('Failed to get items in cart: ' + error.message));
      })
    );
  }


  addToCart(data:ICartItems):Observable<ICartRes>{
    const token = this._auth.getAuthToken()
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(()=> new Error('User is not authenticated'))
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log('Making request to:', this.cartURL);

    return this._http.post<ICartRes>(`${this.cartURL}`, data, { headers }).pipe(
      catchError(error => {
        console.error('Full error object:', error);
        if (error.status === 401) {
          this._router.navigate(['/login'])
          return throwError(() => new Error('Unauthorized. Please log in again.'));
        }
        return throwError(() => new Error('Failed to add item to cart: ' + error.message))
      })
    )

  }
}
