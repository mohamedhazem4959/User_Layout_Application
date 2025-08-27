import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import {  IOrderRes } from '../models/order.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _http: HttpClient, private _auth: AuthService, private _router: Router) { }

  orderUrl = environment.apiUrl + '/order';

  getOrderedItems(orderId: string): Observable<IOrderRes> {
    const token = this._auth.getAuthToken();
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this._http.get<IOrderRes>(`${this.orderUrl}/${orderId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          this._router.navigate(['/login']);
          return throwError(() => new Error('Unauthorized. Please log in again.'));
        }
        return throwError(() => new Error('Failed to get items in cart: ' + error.message));
      })
    )

  }


  placeOrder(shippingAddress:string): Observable<IOrderRes>{
    const token = this._auth.getAuthToken();
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const payload = {shippingAddress}

    return this._http.post<IOrderRes>(`${this.orderUrl}/placeorder`,payload,{ headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          this._router.navigate(['/login']);
          return throwError(() => new Error('Unauthorized. Please log in again.'));
        }
        return throwError(() => new Error('Failed to place order: ' + error.message));
      })
    )
  }

}
