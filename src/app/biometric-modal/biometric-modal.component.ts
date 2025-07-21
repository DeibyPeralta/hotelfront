import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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
  constructor(public dialogRef: MatDialogRef<BiometricModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
