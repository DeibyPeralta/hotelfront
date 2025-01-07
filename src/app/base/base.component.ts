import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  inputBase: FormGroup;

  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<BaseComponent>) {
      this.inputBase = this.fb.group({
        inputValue: [''] 
      });
    }

    onSave(): void {
      console.log('Valor guardado:', this.inputBase.value.inputValue);
      this.dialogRef.close(this.inputBase.value.inputValue); 
    }
  
    onCancel(): void {
      this.dialogRef.close(); 
    }
}
