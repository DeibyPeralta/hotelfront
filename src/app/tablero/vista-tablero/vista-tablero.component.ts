import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { CreateHabitacionComponent } from '../create-habitacion/create-habitacion.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateHistorialComponent } from '../historial/create-historial/create-historial.component';
import { EditarTableroComponent } from '../editar-tablero/editar-tablero.component';


@Component({
  selector: 'app-vista-tablero',
  templateUrl: './vista-tablero.component.html',
  styleUrls: ['./vista-tablero.component.scss']
})
export class VistaTableroComponent {

  displayedColumns: string[] = ['num_habitacion', 'interno', 'hora_llegada', 'aseo', 'llamada', 'destino', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  constructor(private tableroService: UsuariosService,
              private dialog: MatDialog,
              private route: Router) {
                this.cargarTabla();
              }

  ngOnInit(): void {
   
  }

  cargarTabla() {
    this.tableroService.getDatosDeTablero().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  shouldShowActions(element: any): boolean {
    return !element.interno && !element.hora_llegada && !element.aseo && !element.llamada && !element.destino;
  }

  editarFila(element: any) {
    const dialogRef = this.dialog.open(EditarTableroComponent, {
      data: {
          num_habitacion: element.num_habitacion,
          interno: element.interno,
          hora_llegada: element.hora_llegada,
          aseo: element.aseo,
          llamada: element.llamada,
          destino: element.destino,
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }
  
  eliminarFila(element: any) {
    // console.log( element );

    const dialogRef = this.dialog.open(CreateHistorialComponent, {
      data: {
          num_habitacion: element.num_habitacion,
          interno: element.interno,
          hora_llegada: element.hora_llegada,
          aseo: element.aseo,
          llamada: element.llamada,
          destino: element.destino,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

  insertarFila(index: number) {
    console.log(`Habitación: ${index}`);
    this.route.navigate(['/dashboard/registrar/', index]); 
  }

 newHabitacion( ) {
    const dialogRef = this.dialog.open(CreateHabitacionComponent, {
      data: 'paso 1',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }
  
}
