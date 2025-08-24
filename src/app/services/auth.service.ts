import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { ILogin, ILoginRes, IRegister, IRegisterRes, IUserData } from '../models/user.model';
import { environment } from '../../environments/environments';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(private _http: HttpClient, private _router: Router) { }

  private isAuth = new BehaviorSubject<IUserData | null>(this.isLoggedin());
  public isAuth$ = this.isAuth.asObservable();
  private registerURL = environment.apiUrl + '/auth/register/user';
  private url = environment.apiUrl + '/auth/login'
  private token_key = 'token';

  login(data: ILogin) {
  return this._http.post<ILoginRes>(this.url, data).pipe(
    tap({
      next: (res) => {
        const token = res.token;
        if (token) {
          this.storeToken(token);
          const decode = this.decodeToken(token);
          this.isAuth.next(decode);
          if (decode?.role) {
            if (decode.role === 'user') {
              this._router.navigate(['/']);
            } 
          }
        } else {
          console.error('No token found in response');
        }
      },
      error: (err) => {
        console.error('Login error:', err); 
      }
    })
  );
}


register(data:IRegister){
  return this._http.post<IRegisterRes>(this.registerURL,data).pipe(
    tap({
      next: (res) => {
        this._router.navigate(['/login']);
      },
      error: (err) =>{
        console.error('Register error: ' , err);
        
      }
    })
  )
}

  isLoggedin(): IUserData | null {
    const token = this.getToken();
    if (token) {
      const decode = this.decodeToken(token);
      return decode;
    }
    return null;
  }

  isUserLoggedin(): boolean {
  const token = this.getToken();
  console.log('Checking login status, token:', token); 
  return !!token;
}

  logout() {
    localStorage.removeItem(this.token_key);
    this.isAuth.next(null);
  }

  private decodeToken(token: string): IUserData | null {
  try {
    const decode = jwtDecode<IUserData>(token);
    if (!decode) {
      return null;
    }
    if (decode.exp) {
      const expiry = decode.exp * 1000;
      if (expiry > Date.now()) {
        return decode;
      } else {
        console.warn('Token is expired');
      }
    }
    return null;
  } catch (err) {
    console.error('Token decoding error:', err);
    return null;
  }
}

  private storeToken(token: string) {
  if (localStorage) {
    localStorage.setItem(this.token_key, token);
  } else {
    console.error('localStorage is not available');
  }
}

  private getToken() {
    return localStorage.getItem(this.token_key);
  }

  public getAuthToken(): string | null {
    return this.getToken();
  }

}
