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
    console.log('AuthService - Login attempt:', username, password);
    // Simulación de autenticación
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      this.currentUser = username;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
      }
      console.log('AuthService - Login successful');
      return true;
    }
    console.log('AuthService - Login failed');
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
    console.log('AuthService - Checking authentication...');
    // Verificar tanto el estado en memoria como en localStorage
    if (this.isLoggedIn) {
      console.log('AuthService - Authenticated via memory state');
      return true;
    }

    if (isPlatformBrowser(this.platformId)) {
      const storedLogin = localStorage.getItem('isLoggedIn');
      console.log('AuthService - Stored login value:', storedLogin);
      if (storedLogin === 'true') {
        this.isLoggedIn = true;
        this.currentUser = localStorage.getItem('currentUser');
        console.log('AuthService - Authenticated via localStorage, user:', this.currentUser);
        return true;
      }
    }

    console.log('AuthService - Not authenticated');
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
