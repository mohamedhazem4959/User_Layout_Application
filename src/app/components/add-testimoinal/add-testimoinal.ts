import { Component } from '@angular/core';
import { TestimoinalsService } from '../../services/testimoinals.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-testimoinal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-testimoinal.html',
  styleUrl: './add-testimoinal.css'
})

export class AddTestimoinal {
  constructor(private _testS: TestimoinalsService, private router: ActivatedRoute) { }


  reactiveForm: FormGroup = new FormGroup({
  message : new FormControl('', Validators.required),
  rating  : new FormControl('', Validators.required)
})

  starOptions = [
    { label: '⭐', value: '1 Star' },
    { label: '⭐⭐', value: '2 Stars' },
    { label: '⭐⭐⭐', value: '3 Stars' },
    { label: '⭐⭐⭐⭐', value: '4 Stars' },
    { label: '⭐⭐⭐⭐⭐', value: '5 Stars' }
  ];
  
  onSubmit() {
  if (this.reactiveForm.valid) {
    console.log('About to send:', this.reactiveForm.value);
    this.addNewTestimoinal();
  }
}

  addNewTestimoinal() {
    this._testS.addTestimoinal(this.reactiveForm.value).subscribe({
      next: res => {
        console.log('Testimoinal added', res)
      }
    })
  }
}
