import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UsuariosService } from '../../tablero/services/usuarios.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  form: FormGroup;
  loading= false;

  constructor(private fb: FormBuilder,
    private usuarioservice: UsuariosService,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(){

  }

  ingresar(){
    
    const correo = this.form.value.correo;
    const password = this.form.value.password;

    this.usuarioservice.login(correo, password).subscribe(
      response => { 
        console.log(response);
        if(response === 'Contraseña incorrecta'){
          this.error();
          this.form.reset();
        }else {
          this.login();          
        }
        
      }
    )
  }

  error(){
    this._snackBar.open('error de credencias', '',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  login(){ 
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1000);
  }

  register(){
    setTimeout(() => {
      this.router.navigate(['registro']);
    }, 1000);
  }
}

