import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-tablero',
  templateUrl: './editar-tablero.component.html',
  styleUrls: ['./editar-tablero.component.scss']
})
export class EditarTableroComponent {

  displayedColumns: string[] = [ 'num_habitacion', 'interno', 'hora_llegada', 'aseo', 'llamada', 'destino'];
  
  constructor( public dialogRef: MatDialogRef<EditarTableroComponent>,
    private usuarioService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder  ){ 
      console.log(this.data);
    }
}
