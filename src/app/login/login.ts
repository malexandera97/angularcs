import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('Login - Form submitted');
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login - Attempting login with:', username);

      if (this.authService.login(username, password)) {
        console.log('Login - Login successful, navigating to /items');
        this.router.navigate(['/items']);
      } else {
        console.log('Login - Login failed');
        this.loginError = 'Credenciales incorrectas. Use admin/admin';
      }
    } else {
      console.log('Login - Form is invalid');
    }
  }
}
