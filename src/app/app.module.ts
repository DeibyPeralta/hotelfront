import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './usuarios/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HabitacionesComponent } from './usuarios/habitaciones/habitaciones.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardTableroRoutingModule } from './tablero/dashboard-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditarHabitacionComponent } from './usuarios/habitaciones/editar-habitacion/editar-habitacion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateUserComponent } from './usuarios/create-user/create-user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BaseComponent } from './base/base.component';
import { ConfigurationComponent } from './usuarios/configuration/configuration.component';
import { EditarPermisosUsuarioComponent } from './usuarios/editar-permisos-usuario/editar-permisos-usuario.component';
import { AuthGuard } from './guards/auth.guard';
import { EditHistorialComponent } from './tablero/historial/edit-historial/edit-historial.component';
import { GastosdiariosComponent } from './tablero/gastosdiarios/gastosdiarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HabitacionesComponent,
    EditarHabitacionComponent,
    CreateUserComponent,
    BaseComponent,     
  ],
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatToolbarModule,
    DashboardTableroRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    MatInputModule, GastosdiariosComponent,
    MatCardModule, EditHistorialComponent,
    MatDialogModule, EditarPermisosUsuarioComponent,
    MatNativeDateModule, ConfigurationComponent,
    FormsModule, MatInputModule , MatDatepickerModule  
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    DashboardTableroRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [AuthGuard, { provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
