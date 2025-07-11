import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-create-historial',
  templateUrl: './create-historial.component.html',
  styleUrls: ['./create-historial.component.scss'],
})

export class CreateHistorialComponent implements OnInit {
  
  displayedColumns: string[] = ['num_habitacion', 'interno', 'hora_llegada', 'aseo', 'llamada', 'destino', 'valor', 'comentario', 'hora_salida', 'fecha'];
  formulario: FormGroup;
  body: any[][] = [];

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateHistorialComponent>,
    private usuarioService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder
  ) {
    const hoy = new Date();
    const fechaFormateada = this.formatearFecha(hoy);

    this.formulario = this.fb.group({
      num_habitacion: [this.data.num_habitacion, Validators.required],
      hora_llegada: [this.data.hora_llegada, Validators.required],
      llamada: [this.data.llamada, Validators.required],
      interno: [this.data.interno, Validators.required],
      placa: [this.data.placa, Validators.required],
      aseo: [this.data.aseo, Validators.required],
      valor_hospedaje: [null, Validators.required],
      valor_lavado: [null, Validators.required],
      valor_parqueo: [null, Validators.required], 
      num_factura: ['', Validators.required], 
      valor_factura: [0], // Bloqueado para edición manual
      comentario: [''],
      socio: [this.data.cod_socio, Validators.required],
      fechaSalida: [{value: fechaFormateada, disabled: true}],
      destino: [this.data.destino, Validators.required],
      hora_salida: ['', Validators.required],
      ropa: [0, Validators.required],
      efectivo_valor_hospedaje: [false],
      efectivo_valor_lavado: [false],
      efectivo_valor_porqueo: [false],
      efectivo_valor_factura: [false],
      efectivo_valor_ropa: [true],
      efectivo_tienda: [true],
      efectivo_aseo: [false],
      tienda: [0],
    });

  }

  ngOnInit() {
    this.suscribirCambios();
    this.formulario.valueChanges.subscribe(() => {
      this.actualizarFactura();
    });
    
  }

  formatearFecha(fecha: Date): string {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  suscribirCambios() {
    ['valor_hospedaje', 'valor_lavado', 'valor_parqueo'].forEach(campo => {
      this.formulario.get(campo)?.valueChanges.subscribe(() => this.actualizarFactura());
    });
  }

  actualizarFactura() {
    const hospedajeIncluido = !this.formulario.get('efectivo_valor_hospedaje')?.value;
    const lavadoIncluido = !this.formulario.get('efectivo_valor_lavado')?.value;
    const parqueoIncluido = !this.formulario.get('efectivo_valor_porqueo')?.value;
    const ropaIncluido = !this.formulario.get('efectivo_valor_ropa')?.value;
    const tiendaIncluido = !this.formulario.get('efectivo_tienda')?.value;
  
    const hospedaje = hospedajeIncluido ? Number(this.formulario.get('valor_hospedaje')?.value) || 0 : 0;
    const lavado = lavadoIncluido ? Number(this.formulario.get('valor_lavado')?.value) || 0 : 0;
    const parqueo = parqueoIncluido ? Number(this.formulario.get('valor_parqueo')?.value) || 0 : 0;
    const ropa = ropaIncluido ? Number(this.formulario.get('ropa')?.value) || 0 : 0;
    const tienda = tiendaIncluido ? Number(this.formulario.get('tienda')?.value) || 0 : 0;
  
    const total = hospedaje + lavado + parqueo + ropa + tienda;
    this.formulario.get('valor_factura')?.setValue(total, { emitEvent: false });
  }

  mostrarError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }

  eliminarHabitacion(numHabitacion: number): void {
    this.usuarioService.deleteHabitaciones(numHabitacion).subscribe((data) => {
      
    });
  }

  historialEfectivo(body: any) {
    this.usuarioService.posthistorialEfectivo(this.body).subscribe((data) => {
      
    });
  }

  guardarHistorial() {
    if (this.formulario.valid) {
      const formularioData = this.formulario.getRawValue();
      this.body = [];
  
      // 👉 Decodificar el token y agregar el usuario
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        formularioData.usuario = decoded.nombre || decoded.correo || decoded.id; // Ajusta según el payload de tu token
      }
  
      const camposEfectivo = [
        { key: 'efectivo_aseo', value: 'aseo' },
        { key: 'efectivo_tienda', value: 'tienda' },
        { key: 'efectivo_valor_factura', value: 'valor_factura' },
        { key: 'efectivo_valor_hospedaje', value: 'valor_hospedaje' },
        { key: 'efectivo_valor_lavado', value: 'valor_lavado' },
        { key: 'efectivo_valor_porqueo', value: 'valor_parqueo' },
        { key: 'efectivo_valor_ropa', value: 'ropa' }
      ];
  
      camposEfectivo.forEach((campo) => {
        if (formularioData[campo.key]) {
          this.body.push([formularioData[campo.value], campo.value]);
        }
      });
        
      this.usuarioService.posthistorialHabitacion(formularioData).subscribe({
        next: (data) => {
          if (data === 'Registro exitoso') {
            this.dialogRef.close();
            this.historialEfectivo(this.body);
            this.eliminarHabitacion(formularioData.num_habitacion);
          }
        },
        error: () => {
          this.mostrarError('Socio no encontrado o inválido. Por favor, inténtalo de nuevo.');
        }
      });
  
    } else {
      // console.log('Formulario inválido');
    }
  }
}
