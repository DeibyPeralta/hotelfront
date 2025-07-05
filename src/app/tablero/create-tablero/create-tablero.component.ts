import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-tablero',
  templateUrl: './create-tablero.component.html',
  styleUrls: ['./create-tablero.component.scss']
})
export class CreateTableroComponent {

  habitacionesDisponibles: any[] = [];
  formulario: FormGroup;
  index: number | undefined;
  mensajeError: string = '';

  constructor(private fb: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private tableroService: UsuariosService) {
    this.formulario = this.fb.group({
      num_habitacion: ['', Validators.required],
      interno: ['', Validators.required],
      hora_llegada: ['', Validators.required],
      aseo: ['', Validators.required],
      llamada: ['', Validators.required],
      destino: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tableroService.getHabitacionesDisponibles().subscribe((data: any) => {
      if (!data.isError) {
        this.habitacionesDisponibles = data.data.map((h: any) => h.num_habitacion);
      }
    });
  
    this.route.params.subscribe(params => {
      this.index = +params['index'];
      this.formulario.patchValue({ num_habitacion: this.index });
    });
  }
  

  enviarFormulario() {
    if (this.formulario.valid) {
      const formData = {
        num_habitacion: this.formulario.value.num_habitacion.toString(),
        interno: this.formulario.value.interno,
        hora_llegada: this.formulario.value.hora_llegada,
        aseo: this.formulario.value.aseo,
        llamada: this.formulario.value.llamada,
        destino: this.formulario.value.destino
      };
  
      this.tableroService.postAddDeTablero(formData).subscribe(
        (data: any) => {
          if (data && data.isError) {
            this.snackBar.open(data.message || 'Ocurrió un error.', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar-error'] 
            });
          } else {
            this.router.navigate(['/dashboard/vista']);
          }
        },
        (error) => {
          this.snackBar.open('Error al comunicarse con el servidor.', 'Cerrar', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-error']
          });
        }
      );
    }
  }
  

  isFormValid(): boolean {
    return this.formulario.valid;
  }
}
