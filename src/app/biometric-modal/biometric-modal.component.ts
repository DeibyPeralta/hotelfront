import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-biometric-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './biometric-modal.component.html',
  styleUrl: './biometric-modal.component.scss'
})
export class BiometricModalComponent {

  iframeUrl: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              public dialogRef: MatDialogRef<BiometricModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
