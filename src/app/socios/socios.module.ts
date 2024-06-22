import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { VistaSociosComponent } from './vista-socios/vista-socios.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [VistaSociosComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
  ]
})
export class SociosModule { }
