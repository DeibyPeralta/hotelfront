import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  providers: [DatePipe]
})
export class HistorialComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'interno', 'num_habitacion', 'hora_llegada', 'comentario', 'hora_salida', 'placa', 'valor_hospedaje', 
    'valor_lavado', 'valor_parqueo', 'num_factura', 'valor_factura', 'Tienda', 'nombre', 'fechasalida'//'aseo', 'llamada', 'destino',
  ];
  historialForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
  dataSourceTemp = new MatTableDataSource<any>();
  startDate: Date | null = null;
  endDate: Date | null = null;

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
      this.dataSourceTemp.data = data;
    });
  }

  downloadExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'datos.xlsx');
    this.snackBar.open('Descargando archivo Excel...', 'Cerrar', { duration: 2000 });
  }

  constructor(private tableroService: UsuariosService, private datePipe: DatePipe, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.historialForm = this.fb.group({
      searchText: [''], // Campo de búsqueda por texto   
      fechaInicio: [null],      // Fecha de inicio del rango
      fechaFin: [null]          // Fecha de fin del rango
    });
    this.cargarTabla();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // Filtro por texto y fecha
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
        return currentTerm + (data as { [key: string]: any })[key] + '◬';
      }, '').toLowerCase();
      const withinDateRange = this.isWithinDateRange(data.fechasalida);
      return dataStr.indexOf(transformedFilter) !== -1 && withinDateRange;
    };
  }

  applyFilter(): void {
    let searchText = this.historialForm.get('searchText')?.value?.toLowerCase();
    if (searchText == "") searchText = null
    const fechaInicio = this.historialForm.get('fechaInicio')?.value;
    const fechaFin = this.historialForm.get('fechaFin')?.value;

    // 1. Si no hay nada, muestra todos los datos (dataSourceTemp).
    if (!searchText && !fechaInicio && !fechaFin) {
      this.dataSource.data = [...this.dataSourceTemp.data];
      return;
    }
    // 2. Filtro de texto (si solo hay texto, aplicamos el filtro por texto).
    let filteredData: any = [...this.dataSourceTemp.data]
    if (searchText) {
      filteredData=this.dataSourceTemp.data.filter((item: any) => {
        return (
          (item.num_habitacion?.toString().toLowerCase().includes(searchText)) ||
          (item.interno?.toString().toLowerCase().includes(searchText)) ||
          (item.hora_llegada?.toString().toLowerCase().includes(searchText)) ||
          (item.aseo?.toString().toLowerCase().includes(searchText)) ||
          (item.llamada?.toString().toLowerCase().includes(searchText)) ||
          (item.destino?.toString().toLowerCase().includes(searchText)) ||
          (item.comentario?.toString().toLowerCase().includes(searchText)) ||
          (item.hora_salida?.toString().toLowerCase().includes(searchText)) ||
          (item.placa?.toString().toLowerCase().includes(searchText)) ||
          (item.valor_hospedaje?.toString().toLowerCase().includes(searchText)) ||
          (item.valor_lavado?.toString().toLowerCase().includes(searchText)) ||
          (item.valor_parqueo?.toString().toLowerCase().includes(searchText)) ||
          (item.num_factura?.toString().toLowerCase().includes(searchText)) ||
          (item.valor_factura?.toString().toLowerCase().includes(searchText)) ||
          (item.Tienda?.toString().toLowerCase().includes(searchText)) ||
          (item.socio?.toString().toLowerCase().includes(searchText))
        );
      });
    }
    // 3. Si solo hay fecha de inicio, filtra solo por fecha de inicio.
    if (fechaInicio && !fechaFin) {
      filteredData = filteredData.filter((item: any) => {
        const fecha = new Date(item.fechasalida);
        const fechaInicioSinHora = new Date(fechaInicio);
        fechaInicioSinHora.setHours(0, 0, 0, 0); // Se asegura de comparar solo la fecha (sin hora) 
        return fecha.setHours(0, 0, 0, 0) === fechaInicioSinHora.getTime();
      });
    }
    // 5. Si hay fecha de inicio y fin, filtra por el rango de fechas.
    if (fechaInicio && fechaFin) {
      filteredData = filteredData.filter((item: any) => {
        const fecha = new Date(item.fechasalida);
        return fecha >= new Date(fechaInicio) && fecha <= new Date(fechaFin);
      });
    }
    // Actualizar los datos filtrados
    this.dataSource.data = filteredData;
  }

  clearDateSelection(): void {
    this.historialForm.get('fechaInicio')?.setValue(null);
    this.historialForm.get('fechaFin')?.setValue(null);
  }
}
