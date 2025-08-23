import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private _categoryS:CategoryService){ }

  productName:string='';
  selectedCategory(route:string){ 
    this._categoryS.setCategory(route)
  }
}
