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
  // fechaFiltro = new FormControl();
  // fechaFormateada: any;
  datosTabla: any;
  // dataSource = new MatTableDataSource<any>();
  // displayedColumns: string[] = ['nombre', 'edad']; 

  constructor(private tableroService: UsuariosService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private route: Router) {
      this.cargarTabla();
    }

    // onFechaSeleccionada(event: MatDatepickerInputEvent<Date>) {
    //   const fechaSeleccionada = event.value;
    //   this.fechaFormateada = this.datePipe.transform(fechaSeleccionada, 'dd/MM/yyyy');
    // }


    ngOnInit(): void { 
      // this.dataSource.filterPredicate = (data: any, filter: string) => {
      //   const formattedDate = this.datePipe.transform(data.fecha, 'dd/MM/yyyy');
      //   return formattedDate === filter;
      // };
   
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // this.dataSource.filter = '';
    }


    // aplicarFiltro() {
    //   // console.log(this.fechaFormateada);
    
    //   // if (!this.fechaFormateada) {
    //   //   this.cargarTabla();
    //   //   return;
    //   // }
    
    //   // const fechaSeleccionada = new Date(this.fechaFormateada);
    
    //   // if (!isNaN(fechaSeleccionada.getTime())) {
    //   //   const datosFiltrados = this.datosTabla.filter((dato: any) => {
    //   //     const datoFecha = new Date(dato.fecha);
    //   //     return datoFecha.toDateString() === fechaSeleccionada.toDateString();
    //   //   });
    
    //   //   this.dataSource = new MatTableDataSource(datosFiltrados);
    //   //   this.dataSource.paginator = this.paginator;
    //   //   this.dataSource.sort = this.sort;
    //   // } else {
    //   //   console.error('Fecha no válida');
    //   // }
    // }
    
    cargarTabla() {
      this.tableroService.getHistorial().subscribe(data => {

        console.log(data);
        // this.dataSource = ELEMENT_DATA;tion', 'name', 'weight', 'symbol'];
        this.dataSource.data = data;
        console.log(this.dataSource.data)
        // data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
        // this.dataSource = new MatTableDataSource<any>(data);
        // this.dataSource.paginator = this.paginator;
        // console.log(this.dataSource)

        // this.datosTabla = data;
        // this.cargarDatos(this.dataSource);
      });
    }

    // cargarDatos(data: any){
    //   this.dataSource = new MatTableDataSource(this.datosTabla);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }


}
