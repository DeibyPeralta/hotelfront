import { NgModule } from "@angular/core";
import { EditarTableroComponent } from './editar-tablero/editar-tablero.component';
import { CreateTableroComponent } from './create-tablero/create-tablero.component';
import { VistaTableroComponent } from './vista-tablero/vista-tablero.component';
import { DashboardTableroComponent } from './dashboard-tablero.component';
import { CommonModule } from "@angular/common";
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardTableroRoutingModule } from "./dashboard-routing.module";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CreateHabitacionComponent } from './create-habitacion/create-habitacion.component';
import { MatSelectModule } from '@angular/material/select';
import { HistorialComponent } from './historial/historial.component';
import { CreateHistorialComponent } from './historial/create-historial/create-historial.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [  
    EditarTableroComponent, 
    DashboardTableroComponent, 
    CreateTableroComponent, 
    VistaTableroComponent, 
    NavbarComponent, CreateHabitacionComponent, HistorialComponent, CreateHistorialComponent, AgregarClientesComponent,    
  ],
    imports:[
      CommonModule,
      MatFormFieldModule,
      MatSelectModule,
      MatToolbarModule,
      DashboardTableroRoutingModule,
      MatButtonModule, 
      MatIconModule,
      MatTableModule,
      ReactiveFormsModule,
      MatInputModule,
      MatCardModule,
      MatDatepickerModule,   
      MatNativeDateModule,
      MatDialogModule,
      MatPaginatorModule,
      MatGridListModule,
      MatMenuModule
    ],
    providers: [
      DatePipe, 
    ],
})

export class tableroModule { }