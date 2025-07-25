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
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CajaComponent } from "./caja/caja.component";
import { HistorialCajaGeneralComponent } from './caja/historial-caja-general/historial-caja-general.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
    declarations: [  
    EditarTableroComponent, 
    DashboardTableroComponent, 
    CreateTableroComponent, 
    VistaTableroComponent, 
    CajaComponent, 
    NavbarComponent, CreateHabitacionComponent, HistorialComponent, CreateHistorialComponent, AgregarClientesComponent, HistorialCajaGeneralComponent, DashboardComponent,    
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
      MatMenuModule,
      MatTabsModule,
      MatTooltipModule,
      MatCheckboxModule,
      MatSnackBarModule,
      MatFormFieldModule,
      NgChartsModule,
      FormsModule,
      MatExpansionModule
    ],
    providers: [
      DatePipe, 
    ],
})

export class tableroModule { }