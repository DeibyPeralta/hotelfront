import { Component, OnInit } from '@angular/core';
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
export class HabitacionesComponent implements OnInit {

  displayedColumns: string[] = ['estado', 'num_habitacion', 'comentario', 'acciones'];
  dataSource = new MatTableDataSource<any>(); // Inicializado vacío para evitar errores

  constructor(
    private tableroService: UsuariosService,
    public dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.tableroService.getHabitaciones().subscribe({
      next: (data) => {
        console.log('Datos cargados:', data);
        this.dataSource.data = data; // Asigna directamente al arreglo de datos
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
        // Puedes agregar lógica para mostrar un mensaje de error en la interfaz
      },
    });
  }

  editarFila(element: any) {
    const dialogRef = this.dialog.open(EditarHabitacionComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarTabla(); // Recarga la tabla solo si se realizaron cambios
      }
    });
  }
}
