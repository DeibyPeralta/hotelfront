import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../services/usuarios.service';
import { MatDialogRef } from '@angular/material/dialog';
import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO';

registerLocaleData(localeCo, 'es-CO');

@Component({
  selector: 'app-historial-caja-general',
  templateUrl: './historial-caja-general.component.html',
  styleUrls: ['./historial-caja-general.component.scss']
})
export class HistorialCajaGeneralComponent {
  displayedColumns: string[] = ['fecha', 'base', 'efectivodia', 'pagos', 'total', 'usuario', 'turno'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private usuarioService: UsuariosService,
    public dialogRef: MatDialogRef<HistorialCajaGeneralComponent>
  ) {}

  ngOnInit(): void {
    this.cargarHistorial();

    this.dataSource.filterPredicate = (data, filter: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter);
    };
  }

  cargarHistorial(): void {
    this.usuarioService.getHistorialCaja().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
       
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
