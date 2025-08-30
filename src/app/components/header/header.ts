import { Component } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  searchValue: string ='';
  isLoggedIn:boolean=false;
  constructor(private _searchS:SearchService, private _authS:AuthService){ }

  onSearch(){
    this._searchS.setSearchTerm(this.searchValue);
  }

  signIn(){
    return this._authS.isUserLoggedin();
  }

  logOut(){
     this._authS.logout();
   //  this.router.navigate(['/'])
  }
}
