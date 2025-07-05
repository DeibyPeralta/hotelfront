import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const allowedRoles = route.data['roles'] as Array<string>;

      // Validar rol
      if (allowedRoles.includes(decoded.rol.toString())) {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }
    } catch (err) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
