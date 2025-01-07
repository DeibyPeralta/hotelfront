import { NgModule } from '@angular/core';
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
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule  ,MatInputModule ,MatDatepickerModule  
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
