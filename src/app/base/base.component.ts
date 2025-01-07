import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../tablero/services/usuarios.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  inputBase: FormGroup;

  constructor( private fb: FormBuilder,
    private usuarioService: UsuariosService,
    public dialogRef: MatDialogRef<BaseComponent>) {
      this.inputBase = this.fb.group({
        inputValue: [''] 
      });
    }

    onSave(): void {
      const formData = this.inputBase.getRawValue();       

        this.usuarioService.updateBase(formData).subscribe(data => {
          // console.log(data);
        }, error => {
          console.error('Error al obtener el valor de base:', error);
        }
      )

      this.dialogRef.close(this.inputBase.value.inputValue); 
    }
  
    onCancel(): void {
      this.dialogRef.close(); 
    }
}
