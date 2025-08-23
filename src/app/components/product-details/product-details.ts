import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environments';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit { 

  constructor(private _productS:ProductService , private _activeRoute:ActivatedRoute){ }
  product!:IProduct;

  route!:string;
  staticUrl = environment.uploadsUrl + '/';

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe(param =>{
      this.route = param.get('route')!;
      this._productS.getProductByRoute(this.route).subscribe({
        next: res => {
          this.product = res.data
        }
      })
    })
  }
}
