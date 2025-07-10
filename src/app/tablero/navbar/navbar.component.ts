import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private auth: AuthService) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    const userData = this.auth.getUserData();
    console.log('Usuario:', userData.nombre);  // o correo, id, etc.
  }
}
