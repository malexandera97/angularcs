import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  login(username: string, password: string): boolean {
    // Simulación de autenticación
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      this.currentUser = username;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
    }
  }

  isAuthenticated(): boolean {
    // Verificar tanto el estado en memoria como en localStorage
    if (this.isLoggedIn) {
      return true;
    }

    if (isPlatformBrowser(this.platformId)) {
      const storedLogin = localStorage.getItem('isLoggedIn');
      if (storedLogin === 'true') {
        this.isLoggedIn = true;
        this.currentUser = localStorage.getItem('currentUser');
        return true;
      }
    }

    return false;
  }

  getCurrentUser(): string | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('currentUser');
    }

    return null;
  }
}
