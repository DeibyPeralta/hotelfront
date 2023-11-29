import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-tablero',
  templateUrl: './create-tablero.component.html',
  styleUrls: ['./create-tablero.component.scss']
})
export class CreateTableroComponent {

  formulario: FormGroup;
  index: number | undefined;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      this.index = +params['index'];
      this.formulario.patchValue({ num_habitacion: this.index }); // Establece el valor de num_habitacion
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
    
      this.tableroService.postAddDeTablero(formData).subscribe(data => {
        console.log(data);
      })

      this.router.navigate(['/dashboard/vista']); 
    }
  }

  isFormValid(): boolean {
    return this.formulario.valid;
  }
}
