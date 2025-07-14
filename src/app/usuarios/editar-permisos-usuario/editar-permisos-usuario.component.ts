import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-editar-permisos-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    FormsModule
  ],
  templateUrl: './editar-permisos-usuario.component.html',
  styleUrl: './editar-permisos-usuario.component.scss'
})
export class EditarPermisosUsuarioComponent implements OnInit {

  usuarioForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarPermisosUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      id: [this.data.usuario.id],
      nombre: [this.data.usuario.nombre, Validators.required],
      correo: [this.data.usuario.correo, [Validators.required, Validators.email]],
      telefono: [this.data.usuario.telefono],
      rol: [this.data.usuario.rol, Validators.required],
      password: ['']
    });
  }

  cancelar() {
    this.dialogRef.close(); // Cancela sin guardar
  }

  actualizar(){
    if (this.usuarioForm.valid) {
      this.dialogRef.close(this.usuarioForm.value); // Devuelve los datos editados
    }
  }
}
