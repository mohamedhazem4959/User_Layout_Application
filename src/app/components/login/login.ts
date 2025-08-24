import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule , RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private _authS: AuthService, private _router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email // Ensures valid email format
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6) // Example: minimum 6 characters
    ])
  });

  // Object to store backend error messages
  serverErrors: { email?: string; password?: string; general?: string } = {};

  onSubmit() {
    this.serverErrors = {}; // Reset server errors
    if (this.loginForm.valid) {
      const myValue: ILogin = this.loginForm.value as ILogin;
      this._authS.login(myValue).subscribe({
        next: () => {
          console.log('Login successful');
          this.serverErrors.general = 'Login successful!';
        },
        error: (err) => {
          console.error('Login failed:', err);
          // Handle specific backend error messages
          const errorMessage = err.error?.message || err.message || 'Login failed. Please try again.';
          if (errorMessage.toLowerCase().includes('email')) {
            this.serverErrors.email = errorMessage; // e.g., "Invalid email"
          } else if (errorMessage.toLowerCase().includes('password')) {
            this.serverErrors.password = errorMessage; // e.g., "Invalid password"
          } else {
            this.serverErrors.general = errorMessage; // General error
          }
        }
      });
    } else {
      this.serverErrors.general = 'Please fill in all required fields correctly.';
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  // Helper methods to check field errors
  getEmailError(): string {
  const emailControl = this.loginForm.get('email');
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
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.touched) {
      if (passwordControl.hasError('required')) {
        return 'Password is required';
      } else if (passwordControl.hasError('minlength')) {
        return 'Password must be at least 6 characters long';
      }
    }
    return this.serverErrors.password || '';
  }
}