import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  searchValue: string ='';
  constructor(private _searchS:SearchService){ }

  onSearch(){
    this._searchS.setSearchTerm(this.searchValue);
  }

}
