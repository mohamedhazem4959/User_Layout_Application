import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts, IProductsRes } from '../models/products.model';
import { environment } from '../../environments/environments';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  private url = environment.apiUrl + '/product' + '/products';
  private Base_URL = environment.apiUrl;

  getAllProducts(page: number = 1, categoryRoute?: string): Observable<IProductsRes> {
    if (categoryRoute) {
      return this._http.get<IProductsRes>(`${this.Base_URL}/product/filterd/category/${categoryRoute}?page=${page}`)
    } else {
      return this._http.get<IProductsRes>(`${this.url}?page=${page}`).pipe(
        catchError(error => {
          console.error('HTTP Error:', error);
          throw error
        })
      )
    }
  }
  getProductsByPrice(minPrice: number, maxPrice: number, page: number = 1): Observable<IProductsRes> {
    return this._http.get<IProductsRes>(
      `${this.Base_URL}/product/filterd/price?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`
    ).pipe(catchError(error => {
      console.error('HTTP Error: ', error);
      throw error
    }))
  }
}
