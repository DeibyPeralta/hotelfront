import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-edit-historial',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-historial.component.html',
  styleUrls: ['./edit-historial.component.scss']
})
export class EditHistorialComponent {

  formulario: FormGroup;

  constructor(
    private usuarioService: UsuariosService,
    public dialogRef: MatDialogRef<EditHistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    const fechaFormateada = this.formatDateToInput(data.fechasalida);

    // this.formulario = this.fb.group({
    //   num_habitacion: [data.num_habitacion, Validators.required],
    //   interno: [data.interno, Validators.required],
    //   hora_llegada: [data.hora_llegada, Validators.required],
    //   nota: [Validators.required],
    //   valor_factura: [data.valor_factura],
    //   comentario: [data.comentario],
    //   hora_salida: [data.hora_salida],
    //   fecha: [fechaFormateada],
    //   efectivo_valor_hospedaje: [data.efectivo_valor_hospedaje],
    //   efectivo_valor_lavado: [data.efectivo_valor_lavado],
    //   efectivo_valor_parqueo: [data.efectivo_valor_parqueo],
    //   efectivo_valor_ropa: [data.efectivo_valor_ropa],
    //   valor_hospedaje: [data.valor_hospedaje],
    //   valor_lavado: [data.valor_lavado],
    //   valor_parqueo: [data.valor_parqueo],
    //   valor_tienda: [data.valor_tienda],
    //   ropa: [data.ropa],
    //   justificacion: ['', Validators.required],
    //   id: [data.id]
    // });
    this.formulario = this.fb.group({
      num_habitacion: [data.num_habitacion, Validators.required],
      interno: [data.interno, Validators.required],
      hora_llegada: [data.hora_llegada, Validators.required],
      nota: [Validators.required],
      valor_factura: [this.formatCurrency(data.valor_factura)],
      comentario: [data.comentario],
      hora_salida: [data.hora_salida],
      fecha: [fechaFormateada],
      efectivo_valor_hospedaje: [data.efectivo_valor_hospedaje],
      efectivo_valor_lavado: [data.efectivo_valor_lavado],
      efectivo_valor_parqueo: [data.efectivo_valor_parqueo],
      efectivo_valor_ropa: [data.efectivo_valor_ropa],
      valor_hospedaje: [this.formatCurrency(data.valor_hospedaje)],
      valor_lavado: [this.formatCurrency(data.valor_lavado)],
      valor_parqueo: [this.formatCurrency(data.valor_parqueo)],
      valor_tienda: [this.formatCurrency(data.valor_tienda)],
      ropa: [this.formatCurrency(data.ropa)],
      justificacion: ['', Validators.required],
      id: [data.id]
    });

  }

  ngOnInit(): void {}

  private limpiarMoneda(valor: string | number): number {
    if (typeof valor === 'number') return valor;
    if (!valor) return 0;
    return Number(valor.replace(/\$/g, '').replace(/\./g, '').trim());
  }

  formatearMiles(controlName: string): void {
    const control = this.formulario.get(controlName);
    if (!control) return;

    let rawValue = control.value?.toString() || '';
    const numericValue = rawValue.replace(/[^\d]/g, '');

    if (numericValue) {
      const num = parseInt(numericValue, 10);
      control.setValue(`$ ${num.toLocaleString('es-CL')}`, { emitEvent: false });
    } else {
      control.setValue('', { emitEvent: false });
    }
  }

  private formatCurrency(value: number | string | null): string {
    if (value === null || value === undefined || value === '') return '';
    
    // Convertir a número
    const num = typeof value === 'string' 
      ? parseFloat(value.replace(/[^\d.-]/g, '')) 
      : value;
    
    if (isNaN(num)) return '';
  
    // Formatear eliminando decimales .00
    const formatted = num.toLocaleString('es-CL', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  
    return `$ ${formatted}`;
  }

  guardarCambios() {
    if (this.formulario.valid) {
      const formValues = this.formulario.value;
  
      // Limpiar todos los valores monetarios
      const valorHospedaje = this.limpiarMoneda(formValues.valor_hospedaje);
      const valorLavado = this.limpiarMoneda(formValues.valor_lavado);
      const valorParqueo = this.limpiarMoneda(formValues.valor_parqueo);
      const valorTienda = this.limpiarMoneda(formValues.valor_tienda);
      const valorRopa = this.limpiarMoneda(formValues.ropa);
  
      // Calcular el valor_factura sumando solo los valores donde efectivo_valor_* es false
      let valorFactura = 0;
      
      if (!formValues.efectivo_valor_hospedaje) {
        valorFactura += valorHospedaje;
      }
      
      if (!formValues.efectivo_valor_lavado) {
        valorFactura += valorLavado;
      }
      
      if (!formValues.efectivo_valor_parqueo) {
        valorFactura += valorParqueo;
      }
      
      if (!formValues.efectivo_valor_ropa) {
        valorFactura += valorRopa;
      }
    
      valorFactura += valorTienda;
  
      const body = {
        ...formValues,
        valor_factura: valorFactura,
        valor_hospedaje: valorHospedaje,
        valor_lavado: valorLavado,
        valor_parqueo: valorParqueo,
        valor_tienda: valorTienda,
        ropa: valorRopa,
        justificacion: formValues.justificacion, 
        id: this.data.id 
      };
        
      this.usuarioService.actualizarHistorial(body).subscribe(() => {
        this.dialogRef.close(body);
      });
    }
  }
  
  cancelar() {
    this.dialogRef.close();
  }

  private formatDateToInput(fechaIso: string): string {
    const date = new Date(fechaIso);
    return date.toISOString().split('T')[0]; // Retorna "YYYY-MM-DD"
  }
  
}
