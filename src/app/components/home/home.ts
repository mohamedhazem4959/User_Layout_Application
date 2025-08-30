import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProducts, IProductsRes } from '../../models/products.model';
import { environment } from '../../../environments/environments';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private _productsS: ProductsService, private _searchS: SearchService, private _route: ActivatedRoute) { }

  currentCategory: string | null = null;
  subCategories: { _id: string; name: string; description: string; parentCategory: string | null; route: string }[] = [];
  products!: IProducts[];
  displayedProducts: IProducts[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  minPrice!: number;
  maxPrice!: number;
  lastMin: number = 0
  lastMax: number = 0
  staticUrl = environment.uploadsUrl;

  onCategoryChange(route: string) {
    this._route.paramMap.subscribe(params => {
      const category = params.get('categoryRoute');
      this.currentCategory = category
      if (category) {
        this._productsS.getAllProducts(1, category).subscribe(res => {
          // Get subcategories from the first product's category.subcategories
          this.subCategories = res.data.result.length > 0 ? res.data.result[0].category.subcategories || [] : [];
          this.products = this.mergeProductsFromSubcategories(res);
          this.displayedProducts = this.products
          this.currentPage = res.data.page;
          this.totalPages = res.data.totalPages;
          this.hasNextPage = res.data.hasNextPage;
          this.hasPrevPage = res.data.hasPrevPage;
        })
      } else {
        this.loadProducts(this.currentPage)
      }
    })
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(param => {
      const category = param.get('categoryRoute');
      this.currentCategory = category
      if (category) {
        this._productsS.getAllProducts(1, category).subscribe(res => {
          // Get subcategories from the first product's category.subcategories
          this.subCategories = res.data.result.length > 0 ? res.data.result[0].category.subcategories || [] : [];
          this.products = this.mergeProductsFromSubcategories(res);
          this.displayedProducts = this.products
          this.currentPage = res.data.page;
          this.totalPages = res.data.totalPages;
          this.hasNextPage = res.data.hasNextPage;
          this.hasPrevPage = res.data.hasPrevPage;
        })
      }
      else {
        this.loadProducts(this.currentPage)
      }
    })


    this._searchS.searchTerm$.subscribe(term => {
      if (!this.products) return
      if (term.trim() === '') {
        this.displayedProducts = this.products;
      } else {
        this.displayedProducts = this.products.filter(p => p.name.toLowerCase().includes(term.toLocaleLowerCase()))
      }
    })
  }

  loadProducts(page: number) {
    this._productsS.getAllProducts(page, this.currentCategory || undefined).subscribe({
      next: (res: IProductsRes) => {
        console.log('API Response:', res);
        console.log('SubCategories:', res.subCategories);
        this.products = this.mergeProductsFromSubcategories(res);
        this.displayedProducts = this.products;
        this.currentPage = res.data.page;
        this.totalPages = res.data.totalPages;
        this.hasNextPage = res.data.hasNextPage
        this.hasPrevPage = res.data.hasPrevPage
        // Get subcategories from the first product's category.subcategories
        this.subCategories = res.data.result.length > 0 ? res.data.result[0].category.subcategories || [] : [];
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


  filterByPrice(minPrice: number, maxPrice: number, page: number = 1) {
    if (minPrice === 0 && maxPrice === 0) {
      this.loadProducts(this.currentPage)
    }
    this.lastMin = minPrice ? Number(minPrice) : 0;
    this.lastMax = maxPrice ? Number(maxPrice) : 0;
    this._productsS.getProductsByPrice(this.lastMin, this.lastMax, page).subscribe({
      next: (res) => {
        console.log('Price Filter Response:', res); // Debug: Log response
        console.log('SubCategories:', res.subCategories); //
        this.products = res.data.result;
        this.displayedProducts = this.products
        this.currentPage = res.data.page;
        this.totalPages = res.data.totalPages;
      },
      error: (err) => console.log(err)
    })
  }
  getCategoryCheckboxId(): string {
    return `cat-${this.currentCategory || 'default'}`;
  }

  private mergeProductsFromSubcategories(res: IProductsRes): IProducts[] {
    let mergedProducts = [...res.data.result];
    
    // Get subcategory products from the first product's category.subcategories (assuming all products in same category)
    if (res.data.result.length > 0 && res.data.result[0].category.subcategories) {
      res.data.result[0].category.subcategories.forEach((subCategory) => {
        if (subCategory.products && subCategory.products.length > 0) {
          mergedProducts = [...mergedProducts, ...subCategory.products];
        }
      });
    }
    
    // Deduplicate products by _id
    const uniqueProductsMap = new Map<string, IProducts>();
    mergedProducts.forEach(product => {
      if (!uniqueProductsMap.has(product._id)) {
        uniqueProductsMap.set(product._id, product);
      }
    });
    
    return Array.from(uniqueProductsMap.values());
  }
}


