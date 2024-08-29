import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  providers: [DatePipe] 
})
export class HistorialComponent {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['interno', 'num_habitacion', 'hora_llegada', 'aseo', 'llamada', 'destino', 'comentario', 'hora_salida', 'placa', 'valor_hospedaje', 'valor_lavado', 'valor_parqueo', 'num_factura', 'valor_factura', 'socio', 'fechasalida'];
  dataSource = new MatTableDataSource<any>();

  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private tableroService: UsuariosService, private datePipe: DatePipe) {
    this.cargarTabla();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
        return currentTerm + (data as { [key: string]: any })[key] + '◬';
      }, '').toLowerCase();

      const withinDateRange = this.isWithinDateRange(data.fechasalida);

      return dataStr.indexOf(transformedFilter) != -1 && withinDateRange;
    };
  }

  private isWithinDateRange(fechasalida: string): boolean {
    if (!this.startDate && !this.endDate) {
      return true;
    }

    const fechaSalidaDate = new Date(fechasalida);

    if (this.startDate && this.endDate) {
      return fechaSalidaDate >= this.startDate && fechaSalidaDate <= this.endDate;
    }

    if (this.startDate) {
      return fechaSalidaDate >= this.startDate;
    }

    if (this.endDate) {
      return fechaSalidaDate <= this.endDate;
    }

    return true;
  }


  cargarTabla() {
    this.tableroService.getHistorial().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDateFilter() {
    this.dataSource.filter = this.dataSource.filter; // Trigger filtering
  }

}