import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const isAuth = this.authService.isAuthenticated();
    console.log('AuthGuard - isAuthenticated:', isAuth);

    if (isAuth) {
      console.log('AuthGuard - Access granted');
      return true;
    } else {
      console.log('AuthGuard - Access denied, redirecting to login');
      // Redirigir al login si no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
