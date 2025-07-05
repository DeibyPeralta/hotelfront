import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  data: any[] = [];
  filtroSocio: string = '';
  filtroFechaDesde: string = '';
  filtroFechaHasta: string = '';

  doughnutChartServicios!: ChartConfiguration<'doughnut'>['data'];
  doughnutChartIngresosPorDia!: ChartConfiguration<'doughnut'>['data'];
  doughnutChartPorSocio!: ChartConfiguration<'doughnut'>['data'];

  constructor(private tableroService: UsuariosService) {}

  ngOnInit() {
    const hoy = new Date();
    const haceUnMes = new Date();
    haceUnMes.setMonth(hoy.getMonth() - 1);
  
    this.filtroFechaHasta = hoy.toISOString().split('T')[0]; // "YYYY-MM-DD"
    this.filtroFechaDesde = haceUnMes.toISOString().split('T')[0];

  
    this.obtenerHistorial();    
  }

  obtenerHistorial() {
    let fechasistema = '';
    if (this.filtroFechaDesde || this.filtroFechaHasta) {
      fechasistema = `${this.formatearFecha(this.filtroFechaDesde)},${this.formatearFecha(this.filtroFechaHasta)}`;
    }    
    
    this.tableroService.getHistorialFilter({
      socio: this.filtroSocio,
      fechasistema: fechasistema
    }).subscribe(data => {
      this.data = data;
      this.generarGraficos();
    });
  }

  generarGraficos() {
    // 1. Ingresos por servicio
    const totalHospedaje = this.sumatoria('valor_hospedaje');
    const totalLavado = this.sumatoria('valor_lavado');
    const totalParqueo = this.sumatoria('valor_parqueo');

    this.doughnutChartServicios = {
      labels: ['Hospedaje', 'Lavado', 'Parqueo'],
      datasets: [{ label: 'Ingresos por servicio', data: [totalHospedaje, totalLavado, totalParqueo] }]
    };

    // 2. Ingresos por día
    const ingresosPorDia: { [fecha: string]: number } = {};
    
    this.data.forEach(r => {
      const fecha = new Date(r.fechasalida).toLocaleDateString();
      ingresosPorDia[fecha] = (ingresosPorDia[fecha] || 0) + parseInt(r.valor_factura || '0');
    });
    this.doughnutChartIngresosPorDia = {
      labels: Object.keys(ingresosPorDia),
      datasets: [{ label: 'Ingresos diarios', data: Object.values(ingresosPorDia) }]
    };

    // 3. Ingresos por socio
    const ingresosPorSocio: { [socio: string]: number } = {};
    this.data.forEach(r => {
      const socio = r.nombre || 'Sin socio';
      ingresosPorSocio[socio] = (ingresosPorSocio[socio] || 0) + parseInt(r.valor_factura || '0');
    });
    this.doughnutChartPorSocio = {
      labels: Object.keys(ingresosPorSocio),
      datasets: [{ label: 'Ingresos por socio', data: Object.values(ingresosPorSocio) }]
    };

  }

  sumatoria(campo: string): number {
    return this.data.reduce((sum, r) => sum + parseInt(r[campo] || '0'), 0);
  }

  formatearFecha(fecha: string | Date): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toISOString().split('T')[0]; // Devuelve "YYYY-MM-DD"
  }

  limpiarFiltros(): void {
    this.filtroSocio = '';
    this.filtroFechaDesde = '';
    this.filtroFechaHasta = '';
    this.obtenerHistorial(); // vuelve a cargar los datos sin filtros
  }
  

}
