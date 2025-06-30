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
  filtroDestino: string = '';
  filtroFechaDesde: string = '';
  filtroFechaHasta: string = '';

  doughnutChartServicios!: ChartConfiguration<'doughnut'>['data'];
  doughnutChartIngresosPorDia!: ChartConfiguration<'doughnut'>['data'];
  doughnutChartPorSocio!: ChartConfiguration<'doughnut'>['data'];
  doughnutChartDestinos!: ChartConfiguration<'doughnut'>['data'];

  constructor(private tableroService: UsuariosService) {}

  ngOnInit() {
    this.obtenerHistorial();    
  }

  obtenerHistorial() {
    let fechasistema = '';
    if (this.filtroFechaDesde || this.filtroFechaHasta) {
      fechasistema = `${this.filtroFechaDesde || ''},${this.filtroFechaHasta || ''}`;
    }
    
    this.tableroService.getHistorialFilter({
      socio: this.filtroSocio,
      destino: this.filtroDestino,
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

    // 4. Frecuencia por destino
    const destinos: { [destino: string]: number } = {};
    this.data.forEach(r => {
      const destino = r.destino?.trim() || 'Sin destino';
      destinos[destino] = (destinos[destino] || 0) + 1;
    });
    this.doughnutChartDestinos = {
      labels: Object.keys(destinos),
      datasets: [{ label: 'Visitas por destino', data: Object.values(destinos) }]
    };
  }

  sumatoria(campo: string): number {
    return this.data.reduce((sum, r) => sum + parseInt(r[campo] || '0'), 0);
  }

}
