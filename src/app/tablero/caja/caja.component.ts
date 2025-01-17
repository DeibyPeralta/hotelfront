import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent {
  baseValue!: number;
  base!: number;
  form: FormGroup;

  constructor( private fb: FormBuilder,
    private dialog: MatDialog,
    private usuarioService: UsuariosService) {
    this.form = this.fb.group({
      base: [''], 
      efectivoDelDia: [''], 
      total: [ ''] 
    });
   }

  ngOnInit(): void {
    this.loadBaseValue();
  }

  loadBaseValue(): void {
    this.usuarioService.getEfectivo().subscribe(
      (data) => {
        console.log(data);
        console.log('Paso 35');
        this.baseValue = data.total_efectivo;
        this.base = data.base;
        this.form.get('efectivoDelDia')?.setValue(this.formatNumber(this.baseValue)); 
        this.form.get('base')?.setValue(this.formatNumber(this.base)); 

        this.calculateTotal();
      },
      (error) => {
        console.error('Error al obtener el valor de base:', error);
      }
    );
  }


  formatNumber(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    const parts = value.toString().split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? ',' + parts[1] : '';
    
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `$ ${formattedIntegerPart + decimalPart}`;
  }

  submitForm(): void { 
      const formData = this.form.getRawValue();    

      this.usuarioService.insertEfectivo(formData).subscribe(data => {
          console.log(data);
        }, error => {
          console.error('Error al obtener el valor de base:', error);
        }
      )

      console.log('Datos del formulario:', formData);
      this.form.reset(); 
  }

  calculateTotal(): void {
  
    const base = this.base; 
    const efectivoDelDia = this.baseValue; 

    console.log('baseNumber:', base);
    console.log('efectivoDelDiaNumber:', efectivoDelDia);
      
    const total = efectivoDelDia - base;
  
    // Actualiza el campo 'total' del formulario
    this.form.get('total')?.setValue(this.formatNumber(total));
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(BaseComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      this.loadBaseValue();
      if (result) {
        console.log('Dato guardado desde el diálogo:', result);
      }
    });
  }
  
 
}
