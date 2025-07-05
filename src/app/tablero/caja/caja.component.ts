import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base/base.component';
import { HistorialCajaGeneralComponent } from './historial-caja-general/historial-caja-general.component';

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
      total: [ ''],
      pagosRealizados: ['', Validators.required],
      turno: ['', Validators.required],
      usuario: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    
    this.form.get('efectivoDelDia')?.valueChanges.subscribe(value => {
        const parsed = this.parseCurrency(value);
        const formatted = this.formatNumber(parsed);
        
        if (this.form.get('efectivoDelDia')?.value !== formatted) {
          this.form.get('efectivoDelDia')?.setValue(formatted, { emitEvent: false });
        }
        this.calculateTotal();
    });
    
    this.loadBaseValue();

    this.form.get('pagosRealizados')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  loadBaseValue(): void {
    this.usuarioService.getEfectivo().subscribe(
      (data) => {
        
        this.baseValue = data.total_efectivo;
        this.base = data.base;
        this.form.get('efectivoDelDia')?.setValue(this.formatNumber(this.baseValue)); 
        this.form.get('base')?.setValue(this.formatNumber(this.base)); 

        this.calculateTotal();
      },
      (error) => {
                
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
  
    this.usuarioService.insertEfectivo(formData).subscribe(
      response => {
        if (!response.isError && response.data === 'Ya existía un registro para este turno') {
          alert('⚠️ Ya existe un registro para este turno. Por favor, cambia el turno e intenta nuevamente.');
        } else {
          alert('✅ Datos guardados correctamente.');
          this.form.reset(); 
        }
      },
      error => {
     
        alert('❌ Error al guardar los datos. Intenta de nuevo.');
      }
    );
  
  }
  

  calculateTotal(): void {
    const baseRaw = this.form.get('base')?.value ?? '0';
    const efectivoRaw = this.form.get('efectivoDelDia')?.value ?? '0';
    const pagosRaw = this.form.get('pagosRealizados')?.value ?? '0';
  
    const base = this.parseCurrency(baseRaw);
    const efectivo = this.parseCurrency(efectivoRaw);
    const pagos = this.parseCurrency(pagosRaw);
  
    const total = base + efectivo - pagos;
    this.form.get('total')?.setValue(this.formatNumber(total));
  }
  
  parseCurrency(value: string): number {
    if (!value) return 0;
    const cleaned = value.toString().replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  }

  onPagosRealizadosInput(event: any): void {
  const rawValue = event.target.value.replace(/\./g, '').replace(/[^\d]/g, '');
  this.form.get('pagosRealizados')?.setValue(rawValue);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BaseComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      this.loadBaseValue();
      if (result) {
      
      }
    });
  }
 
  verHistorial(): void {
    this.dialog.open(HistorialCajaGeneralComponent, {
      width: '90vw',
      height: '80vh',
      maxHeight: '90vh',
      panelClass: 'dialog-historial',
      disableClose: false // o true si no quieres que se cierre al hacer clic fuera
    });
  }
}
