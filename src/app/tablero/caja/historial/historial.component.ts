import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  displayedColumns: string[] = ['fecha', 'base', 'efectivo', 'total', 'usuario'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.usuarioService.getHistorialCaja().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error cargando historial:', err);
      }
    });
  }

}
