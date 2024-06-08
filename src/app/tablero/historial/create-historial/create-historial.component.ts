import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-create-historial',
  templateUrl: './create-historial.component.html',
  styleUrls: ['./create-historial.component.scss'],
})
export class CreateHistorialComponent {

  displayedColumns: string[] = [ 'num_habitacion', 'interno', 'hora_llegada', 'aseo', 'llamada', 'destino', 'valor', 'comentario', 'hora_salida', 'fecha'];
  formulario: FormGroup;
  fechaFormateada: any;

  constructor( public dialogRef: MatDialogRef<CreateHistorialComponent>,
    private usuarioService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder  ) {
      //  console.log(this.data);

       this.formulario = this.fb.group({
         num_habitacion: [this.data.num_habitacion, Validators.required],
         interno: [this.data.interno, Validators.required],
         hora_llegada: [this.data.hora_llegada, Validators.required],
         aseo: [this.data.aseo, Validators.required],
         llamada: [this.data.llamada, Validators.required],
         destino: [this.data.destino, Validators.required],
         valor: ['', Validators.required],
         comentario: [''],
         hora_salida: ['', Validators.required],
         fechaSalida: ['', Validators.required],
       });
    }

    guardarHistorial(){
      this.formatFecha();
      
      const body = this.formulario.value;
      body.fechaSalida = this.fechaFormateada;
      
      console.log(body);
      // this.usuarioService.posthistorialHabitacion(body).subscribe((data) => {
      //   if (data === 'Registro exitoso') {
      //     this.dialogRef.close();
      //     this.eliminarHabitacion(body.num_habitacion);
      //   }
      // });
    }

    eliminarHabitacion(numHabitacion: number): void {
      this.usuarioService.deleteHabitaciones(numHabitacion).subscribe((data) => {
        console.log(data);        
      });
    }

    formatFecha(){
      const formData = this.formulario.value;
      const fechaSalida: Date = formData.fechaSalida;

      const dia = fechaSalida.getDate(); 
      const mes = fechaSalida.getMonth() + 1; 
      const anio = fechaSalida.getFullYear(); 

      this.fechaFormateada = `${dia}/${mes}/${anio}`;

      // console.log('Fecha formateada:', this.fechaFormateada);
    }
}
