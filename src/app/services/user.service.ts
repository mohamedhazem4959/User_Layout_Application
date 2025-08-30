import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { IUserData, IUserDataRes } from '../models/user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http:HttpClient, private _authS:AuthService, private _router:Router){ }
  BaseUrl = environment.apiUrl +'/users'
  getUser(){
     const token = this._authS.getAuthToken();
      if (!token) {
        this._router.navigate(['/login']);
        return throwError(() => new Error('User is not authenticated'));
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    return this._http.get<IUserDataRes>(`${this.BaseUrl}/user` , {headers}).pipe(
      catchError(error => {
        console.log(error)
        throw error
      })
    )
  }
}
