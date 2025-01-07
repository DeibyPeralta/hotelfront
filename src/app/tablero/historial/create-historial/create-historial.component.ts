import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-historial',
  templateUrl: './create-historial.component.html',
  styleUrls: ['./create-historial.component.scss'],
})
export class CreateHistorialComponent {

  displayedColumns: string[] = [ 'num_habitacion', 'interno', 'hora_llegada', 'aseo', 'llamada', 'destino', 'valor', 'comentario', 'hora_salida', 'fecha'];
  formulario: FormGroup;
  fechaFormateada: any;
  body: any[][] = [];

  constructor( 
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateHistorialComponent>,
    private usuarioService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder  ) {
      //  console.log(this.data);

       this.formulario = this.fb.group({
         num_habitacion: [this.data.num_habitacion, Validators.required],
         hora_llegada: [this.data.hora_llegada, Validators.required],
         llamada: [this.data.llamada, Validators.required],
         interno: [this.data.interno, Validators.required],
         placa: ['', Validators.required],
         aseo: [this.data.aseo, Validators.required],
         valor_hospedaje: ['', Validators.required],
         valor_lavado: ['', Validators.required],
         valor_parqueo: ['', Validators.required], 
         num_factura: ['', Validators.required], 
         valor_factura: ['', Validators.required], 
         comentario: [''],
         socio: ['', Validators.required],
         fechaSalida: ['', Validators.required],
         destino: [this.data.destino, Validators.required],
         hora_salida: ['', Validators.required],
         ropa: ['', Validators.required],
         efectivo_valor_hospedaje: [''],
         efectivo_valor_lavado: [''],
         efectivo_valor_porqueo: [''],
         efectivo_valor_factura: [''],
         efectivo_valor_ropa: [''],
         efectivo_tienda: [''],
         efectivo_aseo: [''],
         tienda: [''],
       });
    }

    guardarHistorial() {
      if (this.formulario.valid) {
        const formularioData = this.formulario.getRawValue();      

        const camposEfectivo = [
          { key: 'efectivo_aseo', value: 'aseo' },
          { key: 'efectivo_tienda', value: 'tienda' },
          { key: 'efectivo_valor_factura', value: 'valor_factura' },
          { key: 'efectivo_valor_hospedaje', value: 'valor_hospedaje' },
          { key: 'efectivo_valor_lavado', value: 'valor_lavado' },
          { key: 'efectivo_valor_porqueo', value: 'valor_parqueo' },
          { key: 'efectivo_valor_ropa', value: 'ropa' }
        ];
        
        camposEfectivo.forEach((campo) => {
            if (formularioData[campo.key] === true) {
              this.body.push([formularioData[campo.value], campo.value]);
            }
        });

        this.usuarioService.posthistorialHabitacion(formularioData).subscribe({
          next: (data) => {
            if (data === 'Registro exitoso') {
              this.dialogRef.close();
              this.historialEfectivo(this.body)
              this.eliminarHabitacion(formularioData.num_habitacion);
            }
          },
          error: () => {
            this.mostrarError('Socio no encontrado o inválido. Por favor, inténtalo de nuevo.');
          }
        });
       
      } else {
        console.log('Formulario inválido');
      }
    }

    
    mostrarError(mensaje: string) {
      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 5000,
        panelClass: ['snackbar-error'],
      });
    }

    eliminarHabitacion(numHabitacion: number): void {
      this.usuarioService.deleteHabitaciones(numHabitacion).subscribe((data) => {
        console.log(data);        
      });
    }

    historialEfectivo(body: any){
      this.usuarioService.posthistorialEfectivo(this.body).subscribe((data) => {
        console.log(data);
      })            
    }

}
