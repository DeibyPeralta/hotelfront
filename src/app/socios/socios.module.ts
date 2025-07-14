import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { VistaSociosComponent } from './vista-socios/vista-socios.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { sociosRoutingModule } from './socios-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { EditSociosComponent } from './edit-socios/edit-socios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [VistaSociosComponent, EditSociosComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    sociosRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule, 
    MatButtonModule,
    MatProgressSpinnerModule
  ],
})
export class SociosModule { }
