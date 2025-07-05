import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-tablero',
  templateUrl: './editar-tablero.component.html',
  styleUrls: ['./editar-tablero.component.scss']
})
export class EditarTableroComponent {

  displayedColumns: string[] = [ 'num_habitacion', 'interno', 'hora_llegada', 'aseo', 'llamada', 'destino'];
  formulario: FormGroup;
  
  constructor( public dialogRef: MatDialogRef<EditarTableroComponent>,
              private usuarioService: UsuariosService,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private fb: FormBuilder  ){ 
                    this.formulario = this.fb.group({
                      num_habitacion: [this.data.num_habitacion, Validators.required],
                      interno: [this.data.interno, Validators.required],
                      hora_llegada: [this.data.hora_llegada, Validators.required],
                      aseo: [this.data.aseo, Validators.required],
                      llamada: [this.data.llamada, Validators.required],
                      destino: [this.data.destino, Validators.required],
                    });
              }

    editarHabitacion(){

      const body = this.formulario.value;

      // console.log(body);
      this.usuarioService.editar_tablero(body).subscribe((data) => {
        this.dialogRef.close();
      })

    }

}
