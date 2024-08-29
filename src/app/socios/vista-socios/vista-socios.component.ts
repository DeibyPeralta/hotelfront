import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from 'src/app/tablero/services/usuarios.service';
import * as XLSX from 'xlsx';
import { EditSociosComponent } from '../edit-socios/edit-socios.component';
@Component({
  selector: 'app-vista-socios',
  templateUrl: './vista-socios.component.html',
  styleUrls: ['./vista-socios.component.scss']
})
export class VistaSociosComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['placa', 'cod_interno', 'cod_socio', 'cedula', 'nombre', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<any>;
  file: File | undefined;

  constructor(private sociosService: UsuariosService,
              public dialog: MatDialog ) {
    this.cargarTabla();
  }

  cargarTabla() {
    this.sociosService.getSocios().subscribe( data => {
        // console.log(data)
        this.dataSource.data = data;
    });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarFila(element: any) {


    const dialogRef = this.dialog.open(EditSociosComponent, {
      width: '350px',
      height: 'auto',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El resultado del dialog es:', result);
      }
      this.sociosService.update_Socio(result).subscribe( data => {
        console.log(data);
      })
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (this.file) {
      
      this.sociosService.updateSocio(this.file).subscribe( data => {
        console.log(data);
      })
    }
  }
}
