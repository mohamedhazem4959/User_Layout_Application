import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';
import { ITestimoinals, ITestimoinalsRes } from '../models/testimoinals.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimoinalsService {
  constructor(private _http:HttpClient, private router:Router, private _authS:AuthService){ }

  private BaseUrl: string = environment.apiUrl
  getAllTestimoinals(){
    return this._http.get<ITestimoinalsRes>(`${this.BaseUrl}/testimonial`).pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    )
  }

  addTestimoinal(data:ITestimoinals){
    const token = this._authS.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const payload = data;
    return this._http.post<ITestimoinalsRes>(`${this.BaseUrl}/testimonial` , payload , { headers } ).pipe(
      catchError(error => {
        console.log('Error while adding testimoinal' , error)
        throw error;
      })
    )
  }
}
