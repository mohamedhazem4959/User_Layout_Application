import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IRegister } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(private _authS: AuthService, private _router: Router) { }

  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phoneNumber:new FormControl<string>('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  }, { validators: this.passwordMatchValidator })
  serverErrors: { name?: string; email?: string; password?: string; general?: string; confirmPassword?:string } = {};

  successMessage: string | null = null;

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  onSubmit() {
    this.serverErrors = {};
    if (this.registerForm.valid) {
      const myValues: IRegister = this.registerForm.value as IRegister;
      this._authS.register(myValues).subscribe({
        next: (res) => {
          this.successMessage = res.msg || 'Registration successful'
        },
        error: (err) => {
          const errMsg = err.error?.message || err.message || 'Registration failed';
          if (errMsg.toLowerCase().includes('email')) {
            this.serverErrors.email = errMsg; // e.g., "Email already exists"
          } else if (errMsg.toLowerCase().includes('password')) {
            this.serverErrors.password = errMsg;
          } else if (errMsg.toLowerCase().includes('name')) {
            this.serverErrors.name = errMsg;
          } else {
            this.serverErrors.general = errMsg;
          }
        }
      });
    } else {
      this.serverErrors.general = 'Please fill in all required fields correctly.';
      this.registerForm.markAllAsTouched();
    }
  }


  getNameError(): string {
    const nameControl = this.registerForm.get('name');
    if (nameControl?.touched) {
      if (nameControl.hasError('required')) {
        return 'Name is required';
      } else if (nameControl.hasError('minlength')) {
        return 'Name must be at least 3 characters long';
      }
    }
    return this.serverErrors.name || '';
  }
  getPhoneNumberError(): string {
    const phoneNumberControl = this.registerForm.get('phoneNumber');
    if (phoneNumberControl?.touched) {
      if (phoneNumberControl.hasError('required')) {
        return 'Phone Number is required';
      } else if (phoneNumberControl.hasError('minlength')) {
        return 'Phone Number must be 11 number';
      }
    }
    return this.serverErrors.name || '';
  }

  getEmailError(): string {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.touched) {
      if (emailControl.hasError('required')) {
        return 'Email is required';
      } else if (emailControl.hasError('email')) {
        return 'Please enter a valid email address';
      }
    }
    return this.serverErrors.email || '';
  }
  getPasswordError(): string {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.touched) {
      if (passwordControl.hasError('required')) {
        return 'Password is required';
      } else if (passwordControl.hasError('minlength')) {
        return 'Password must be at least 6 characters long';
      }
    }
    return this.serverErrors.password || '';
  }

  getConfirmPasswordError(): string {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    if (confirmPasswordControl?.touched) {
      if (confirmPasswordControl.hasError('required')) {
        return 'Confirm password is required';
      } else if (this.registerForm.hasError('mismatch')) {
        return 'Passwords do not match';
      }
    }
    return this.serverErrors.confirmPassword || '';
  }
}
