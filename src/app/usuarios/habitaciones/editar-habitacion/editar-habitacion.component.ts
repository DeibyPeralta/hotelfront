import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/tablero/services/usuarios.service';

@Component({
  selector: 'app-editar-habitacion',
  templateUrl: './editar-habitacion.component.html',
  styleUrls: ['./editar-habitacion.component.scss']
})
export class EditarHabitacionComponent {

  formulario: FormGroup;
  estados = ['Disponible', 'Ocupada', 'Sucia', 'Mantenimiento', 'No disponible'];

    constructor( public dialogRef: MatDialogRef<EditarHabitacionComponent>,
                 private usuarioService: UsuariosService,
                 @Inject(MAT_DIALOG_DATA) public data: any, 
                 private fb: FormBuilder  ) {
                    // console.log(this.data);

                    this.formulario = this.fb.group({
                      estado: [this.data.estado, Validators.required],
                      num_habitacion: [this.data.num_habitacion, Validators.required],
                      comentario: [this.data.comentario]
                    });
                 }


      guardarCambios() {
        if (this.formulario.valid) {
            const formData = this.formulario.value;
            // console.log( formData );
            this.usuarioService.postEditHabitacion(formData).subscribe(data => {
              // console.log(data);
            })
            this.dialogRef.close();
          }
        }
                
}
