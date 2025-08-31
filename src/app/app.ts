import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClickTrackerDirective } from './click-tracker';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ClickTrackerDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angular-coursera');
  currentUser: string | null = null;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('App component initialized');
    this.updateAuthStatus();
  }

  private updateAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser();
    console.log('App - Auth status updated:', { isAuthenticated: this.isAuthenticated, currentUser: this.currentUser });
  }

  logout() {
    this.authService.logout();
    this.updateAuthStatus();
    this.router.navigate(['/login']);
  }
}
