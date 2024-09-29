// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignup() {
    console.log('register called');
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      console.log("register form is valid")
      this.authService
        .register(email, password, email.split('@')[0]) // Use email prefix as username
        .subscribe({
          next: () => {
            this.router.navigate(['/login']); // Navigate on successful signup
            console.log("Successful login")
          },
          error: (error) => {
            this.errorMessage = error.message; // Handle error
          },
        });
    }
  }
}
