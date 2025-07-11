// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/AuthService.service';

@Injectable({ providedIn: 'root' })
export class AuthSesionGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const loggedIn = this.auth.isLoggedIn();

    if (!loggedIn) {
      this.router.navigate(['/login']);
    }
    return loggedIn;
  }
}
