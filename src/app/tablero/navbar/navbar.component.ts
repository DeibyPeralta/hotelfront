import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private auth: AuthService,
              private router: Router  ) {}

  logout() {
 
    this.auth.logout();

    this.router.navigate(['/login']);
  }
}
