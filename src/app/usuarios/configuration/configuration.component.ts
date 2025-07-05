import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuariosService } from 'src/app/tablero/services/usuarios.service';
import { EditarPermisosUsuarioComponent } from '../editar-permisos-usuario/editar-permisos-usuario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  
  constructor( 
      private dialog: MatDialog,
      private usuarioService: UsuariosService ) { }
  dataSource = new MatTableDataSource<any>();
  columnas: string[] = ['Correo', 'Nombre', 'Telefono', 'Rol', 'Acciones'];

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.usuarioService.getPermisos().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getNombreRol(rol: number): string {
    switch (rol) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Recepcionista';
      case 3:
        return 'Auxiliar de turno';
      default:
        return 'Sin rol';
    }
  }
  
  editarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(EditarPermisosUsuarioComponent, {
      width: '400px',
      data: { usuario },
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.usuarioService.editPermisos(result).subscribe(data => {
          this.cargarTabla();
        })
      }
    });
  }
  
  eliminarUsuario(usuario: any) {
    this.usuarioService.deleteUsers(usuario.id).subscribe(data => {
      this.cargarTabla();
    })
  }
  
}