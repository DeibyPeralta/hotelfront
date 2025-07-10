// auth.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserData(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    } catch (e) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
