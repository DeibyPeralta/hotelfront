import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-socios',
  templateUrl: './edit-socios.component.html',
  styleUrls: ['./edit-socios.component.scss']
})
export class EditSociosComponent {

  editForm: FormGroup;
  
    constructor(private fb: FormBuilder,
      private dialogRef: MatDialogRef<EditSociosComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any){
        console.log(data)
        this.editForm = this.fb.group({
          id: [data.id],
          placa: [data.placa],
          cod_interno: [data.cod_interno],
          cod_socio: [data.cod_socio],
          cedula: [data.cedula],
          nombre: [data.nombre],
          telefono: [data.telefono]
        });
    }




    onSave() {
      console.log(this.editForm.value)
      this.dialogRef.close(this.editForm.value);
    }
  
    onCancel() {
      this.dialogRef.close();
    }
}
