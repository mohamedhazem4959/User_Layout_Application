import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProducts, IProductsRes } from '../../models/products.model';
import { environment } from '../../../environments/environments';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { max } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  constructor(private _productsS: ProductsService , private _categoryS:CategoryService) { }


  products!: IProducts[];
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  minPrice!:number;
  maxPrice!:number;
  lastMin:number = 0
  lastMax:number = 0
  staticUrl = environment.uploadsUrl;

  ngOnInit(): void {
    this.loadProducts(this.currentPage)
  }

  loadProducts(page: number ) {
      this._productsS.getAllProducts(page).subscribe({
        next: (res: IProductsRes) => {
          this.products = res.data.result
          this.currentPage = res.data.page;
          this.totalPages = res.data.totalPages;
          this.hasNextPage = res.data.hasNextPage
          this.hasPrevPage = res.data.hasPrevPage
        },
        error: err => {
          console.log('Error fetching products: ', err);
          this.products = [];
        }
      })
  }

  nextPage() {
    if (this.hasNextPage) {
      this.loadProducts(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.hasPrevPage) {
      this.loadProducts(this.currentPage - 1);
    }
  }


  filterByPrice(minPrice:number,maxPrice:number,page: number = 1){
    if (minPrice === 0 && maxPrice === 0) {
      this.loadProducts(this.currentPage)
    }
    this.lastMin = minPrice ? Number(minPrice) : 0;
    this.lastMax = maxPrice ? Number(maxPrice) : 0;
    this._productsS.getProductsByPrice(this.lastMin,this.lastMax,page).subscribe({
      next: (res) =>{
        this.products = res.data.result;
        this.currentPage = res.data.page;
        this.totalPages = res.data.totalPages;
      },
      error: (err) => console.log(err)
    })
  }
}


