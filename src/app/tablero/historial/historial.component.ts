import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['interno', 'num_habitacion', 'hora_llegada', 'aseo', 'llamada', 'destino', 'comentario', 'hora_salida', 'fecha', 'placa', 'valor_hospedaje', 'valor_lavado', 'valor_parqueo', 'num_factura', 'valor_factura', 'socio', 'fechasalida'];
  dataSource = new MatTableDataSource<any>;
  datosTabla: any;

  constructor(private tableroService: UsuariosService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private route: Router) {
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
