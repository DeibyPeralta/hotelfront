import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/tablero/services/usuarios.service';
import { EditarHabitacionComponent } from './editar-habitacion/editar-habitacion.component';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss']
})
export class HabitacionesComponent {

  displayedColumns: string[] = ['estado', 'num_habitacion', 'comentario', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  constructor(private tableroService: UsuariosService,
              public dialog: MatDialog,
              private route: Router) {
          this.cargarTabla();
    }

    cargarTabla() {
        this.tableroService.getHabitaciones().subscribe(data => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
        });
    }

    editarFila(element: any) {
      const dialogRef = this.dialog.open(EditarHabitacionComponent, {
        data: element,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.cargarTabla();
      });
    }
}
