import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from 'src/app/tablero/services/usuarios.service';

@Component({
  selector: 'app-vista-socios',
  templateUrl: './vista-socios.component.html',
  styleUrls: ['./vista-socios.component.scss']
})
export class VistaSociosComponent {

  displayedColumns: string[] = ['placa', 'cod_interno', 'cod_socio', 'cedula', 'nombre', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<any>;

  constructor(private sociosService: UsuariosService) {
    this.cargarTabla();
  }

  cargarTabla() {
    this.sociosService.getSocios().subscribe(
      data => {
        console.log(data)
        this.dataSource.data = data;
      },
      error => {
        console.error('Error al obtener los socios', error);
      }
    );
  }

  ngOnInit(): void {
  }

  editarFila(element: any) {
    // const dialogRef = this.dialog.open(EditarTableroComponent, {
    //   data: {
    //       num_habitacion: element.num_habitacion,
    //       interno: element.interno,
    //       hora_llegada: element.hora_llegada,
    //       aseo: element.aseo,
    //       llamada: element.llamada,
    //       destino: element.destino,
    //     }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.cargarTabla();
    // });
  }
}
