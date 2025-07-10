import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './usuarios/login/login.component';
import { CreateUserComponent } from './usuarios/create-user/create-user.component';
import { AuthSesionGuard } from './guards/authSesion.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: CreateUserComponent },
  { path: 'dashboard', canActivate: [AuthSesionGuard], loadChildren: () => import('./tablero/tablero.module').then(x => x.tableroModule) },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
