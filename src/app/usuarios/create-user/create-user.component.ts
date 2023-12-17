import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/tablero/services/usuarios.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private usuariosService: UsuariosService) {
                this.usuarioForm = this.fb.group({
                    correo: ['', [Validators.required]],
                    password: ['', [Validators.required, Validators.minLength(6)]],
                    nombre: ['', Validators.required],
                    cedula: ['', Validators.required],
                    telefono: ['', Validators.required],
                    rol: ['']
                  });
  }

  ngOnInit() {
  }

  onSubmit() {
      const body = this.usuarioForm.value;
      // console.log(body);
      this.usuariosService.registro(body).subscribe((data) => {
        // console.log(data);
        if(data === 'Usuario ya registrado'){
          this.openSnackBar()
        }else{
          this.ingresar();
        }
      })
  }

  openSnackBar() {
    this._snackBar.open('Usuario ya registrado.', 'Cerrar', {
      duration: 2000, 
      panelClass: ['error-snackbar'], // Clases de estilo adicionales (opcional)
    });
  }

  ingresar(){ 
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1000);
  }

}
