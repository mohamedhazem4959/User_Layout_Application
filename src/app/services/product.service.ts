import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProductRes } from '../models/product';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http:HttpClient){ }

  private url = environment.apiUrl + '/product';

  getProductByRoute(route:string){
    return this._http.get<IProductRes>(`${this.url}/${route}`);
    
  }
}
