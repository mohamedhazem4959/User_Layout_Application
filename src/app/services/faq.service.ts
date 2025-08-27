import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';
import { IFaqRes } from '../models/faq.model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(private _http:HttpClient, private router:Router, private _route:ActivatedRoute , private _auth:AuthService){ }
  BaseUrl = environment.apiUrl;

  getAllFaq(){
    return this._http.get<IFaqRes>(`${this.BaseUrl}/faq`).pipe(
      catchError(error =>{
        console.log(error);
        throw error;
      })
    )
  }
}
