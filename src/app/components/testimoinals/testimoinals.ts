import { Component } from '@angular/core';
import { TestimoinalsService } from '../../services/testimoinals.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ITestimoinals } from '../../models/testimoinals.model';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimoinals',
  imports: [CommonModule, TitleCasePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './testimoinals.html',
  styleUrl: './testimoinals.css'
})
export class Testimoinals {
  constructor(private _testS: TestimoinalsService, private router: ActivatedRoute) { }
  testiminals: ITestimoinals[] = [];
  id: string | null = '';


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log('testiminals id: ', this.id);
    })
    this.getAllTestimoinals()
  }

  reactiveForm: FormGroup = new FormGroup({
    message : new FormControl(''),
    rating : new FormControl('')
  })
  getAllTestimoinals() {
    this._testS.getAllTestimoinals().subscribe({
      next: res => {
        console.log('testimoinals list: ', res)
        this.testiminals = res.data;
      }
    })
  }

  addNewTestimoinal(){
    this._testS.addTestimoinal(this.reactiveForm.value).subscribe({
      next: res => {
        console.log('Testimoinal added' , res)
        this.reactiveForm.reset();
      }
    })
  }
}
