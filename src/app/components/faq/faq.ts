import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environments';
import { catchError } from 'rxjs';
import { IFaq } from '../../models/faq.model';
import { FaqService } from '../../services/faq.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
   constructor(private _faqS: FaqService, private router: Router) { }
  faqs: IFaq[] = []
  isEditing = false;
  currentEditId: string | null = null;
  
  ngOnInit(): void {
    this.loadFaq();
  }

  loadFaq(){
    this._faqS.getAllFaq().subscribe({
      next: res =>{
        this.faqs = res.data;
        console.log('faq list: ' ,res);
      },
      error: err =>{
        console.log(err);
      }
    })
  }
}
