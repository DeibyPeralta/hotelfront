import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-habitacion',
  templateUrl: './create-habitacion.component.html',
  styleUrls: ['./create-habitacion.component.scss']
})
export class CreateHabitacionComponent {

  formulario: FormGroup;
  estados = ['Disponible', 'Ocupada', 'Sucia', 'Mantenimiento', 'No disponible'];
  habitacion: number | undefined;

  constructor( public dialogRef: MatDialogRef<CreateHabitacionComponent>,
              private usuarioService: UsuariosService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder  ) {

        this.usuarioService.getMaxHab().subscribe( data =>{
          
          if( data[0].max_num_habitacion != null){
            this.habitacion = data[0].max_num_habitacion + 1;
          }else {
            this.habitacion = 101;
          }
          this.formulario.patchValue({ num_habitacion: this.habitacion });
        })
                
       this.formulario = this.fb.group({
         estado: ['', Validators.required],
         num_habitacion: ['', Validators.required],
         comentario: ['']
       });
    }

    guardar() {

      console.log(this.formulario.value);

      const body = this.formulario.value;

      this.usuarioService.postaddHabitaciones(body).subscribe( data => {
        if(data === 'ok') {
          this.dialogRef.close();
        }
      })

    }
}
