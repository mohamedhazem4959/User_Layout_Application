import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categorySource = new BehaviorSubject<string | null>(null);
  currentCategory$ = this.categorySource.asObservable();

  setCategory(route: string){
    console.log('Setting category to:', route);
    this.categorySource.next(route);
  }
}
