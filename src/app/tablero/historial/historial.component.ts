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


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [ 'num_habitacion', 'interno', 'hora_llegada', 'aseo', 'llamada', 'destino', 'valor', 'comentario', 'hora_salida', 'fecha'];
  dataSource!: MatTableDataSource<any>;
  fechaFiltro = new FormControl();
  fechaFormateada: any;
  datosTabla: any;

  constructor(private tableroService: UsuariosService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private route: Router) {
      this.cargarTabla();
    }

    onFechaSeleccionada(event: MatDatepickerInputEvent<Date>) {
      const fechaSeleccionada = event.value;
      this.fechaFormateada = this.datePipe.transform(fechaSeleccionada, 'dd/MM/yyyy');
    }


    ngOnInit(): void { 
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const formattedDate = this.datePipe.transform(data.fecha, 'dd/MM/yyyy');
        return formattedDate === filter;
      };
   
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = '';
    }


    aplicarFiltro() {
      console.log(this.fechaFormateada);
    
      if (!this.fechaFormateada) {
        this.cargarTabla();
        return;
      }
    
      const fechaSeleccionada = new Date(this.fechaFormateada);
    
      if (!isNaN(fechaSeleccionada.getTime())) {
        const datosFiltrados = this.datosTabla.filter((dato: any) => {
          const datoFecha = new Date(dato.fecha);
          return datoFecha.toDateString() === fechaSeleccionada.toDateString();
        });
    
        this.dataSource = new MatTableDataSource(datosFiltrados);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        console.error('Fecha no válida');
      }
    }
    
    cargarTabla() {
      this.tableroService.getHistorial().subscribe(data => {
        data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);

        this.datosTabla = data;
        this.cargarDatos(this.datosTabla);
      });
    }

    cargarDatos(data: any){
      this.dataSource = new MatTableDataSource(this.datosTabla);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }


}
