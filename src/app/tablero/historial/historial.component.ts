import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['interno', 'num_habitacion', 'hora_llegada', 'aseo', 'llamada', 'destino', 'comentario', 'hora_salida', 'placa', 'valor_hospedaje', 'valor_lavado', 'valor_parqueo', 'num_factura', 'valor_factura', 'socio', 'fechasalida', 'adicional'];
  dataSource = new MatTableDataSource<any>; 

  constructor(private tableroService: UsuariosService,  ) {
      this.cargarTabla();
    }

    ngOnInit(): void { 
    }

    cargarTabla() {
      this.tableroService.getHistorial().subscribe(data => {

        // console.log(data);
        this.dataSource.data = data;
        // console.log(this.dataSource.data)
      });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
