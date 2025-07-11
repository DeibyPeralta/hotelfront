import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-parking-wash-log',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule, 
    MatCheckboxModule, 
    MatButtonModule, 
    MatTooltipModule 
  ],
  templateUrl: './parking-wash-log.component.html',
  styleUrl: './parking-wash-log.component.scss'
})
export class ParkingWashLogComponent {
  formulario: FormGroup;
  body: any[][] = [];
  
  constructor(private fb: FormBuilder,
      private usuarioService: UsuariosService,
      private snackBar: MatSnackBar,
  ) {    
    const hoy = new Date();
    const fechaFormateada = this.formatearFecha(hoy);
    this.formulario = this.fb.group({
      hora_llegada: ['', Validators.required],
      interno: ['', Validators.required],
      placa: ['', Validators.required],
      aseo: ['', Validators.required],
      valor_lavado: ['', Validators.required],
      valor_parqueo: ['', Validators.required],
      hora_salida: ['', Validators.required],
      num_factura: [''],
      valor_factura: [''],
      comentario: [''],
      socio: [''],
      tienda: [''],
      ropa: [''],
      efectivo_valor_lavado: [false],
      efectivo_valor_porqueo: [false],
      efectivo_valor_ropa: [true],
      efectivo_tienda: [true],
      fechaSalida: [{ value: fechaFormateada, disabled: true }]
    });
  }

  ngOnInit(): void {
    this.setupFacturaAutoSum();

    this.formulario.get('interno')?.valueChanges .pipe(
        debounceTime(500), 
        distinctUntilChanged(),
        filter(value => value && value.toString().length >= 3) 
      )
      .subscribe(value => {
        this.buscarDatosInterno(value);
      });
  }

  buscarDatosInterno(interno: number): void {
    this.usuarioService.obtenerBusPorInterno(interno).subscribe({
      next: (data) => {
        this.formulario.patchValue({
          socio: data.socio || '',
          placa: data.placa || ''
        });
      },
      error: (err) => {
        console.error('No se encontró el interno', err);
        this.formulario.patchValue({ socio: '', placa: '' });
      }
    });
  }

  formatearFecha(fecha: Date): string {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  guardarHistorial(): void {
    if (this.formulario.valid) {

      const formularioData = this.formulario.getRawValue();
      this.body = [];
  
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        formularioData.usuario = decoded.nombre || decoded.correo || decoded.id; 
      }
      this.usuarioService.posthistorialHabitacion(formularioData).subscribe({
        next: (data) => {     
          console.log(data)   
        },
        error: () => {
          this.mostrarError('Socio no encontrado o inválido. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }

  mostrarError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }

  setupFacturaAutoSum(): void {
    const controlsToWatch = [
      'valor_lavado',
      'valor_parqueo',
      'tienda',
      'ropa',
      'efectivo_valor_lavado',
      'efectivo_valor_porqueo',
      'efectivo_valor_ropa',
      'efectivo_tienda',
    ];
  
    controlsToWatch.forEach(control => {
      this.formulario.get(control)?.valueChanges.subscribe(() => {
        this.calcularValorFactura();
      });
    });
  
    this.calcularValorFactura(); // Inicial
  }
  
  calcularValorFactura(): void {
    const f = this.formulario;
  
    const lavado = !f.get('efectivo_valor_lavado')?.value ? +f.get('valor_lavado')?.value || 0 : 0;
    const parqueo = !f.get('efectivo_valor_porqueo')?.value ? +f.get('valor_parqueo')?.value || 0 : 0;
    const tienda = !f.get('efectivo_tienda')?.value ? +f.get('tienda')?.value || 0 : 0;
    const ropa = !f.get('efectivo_valor_ropa')?.value ? +f.get('ropa')?.value || 0 : 0;
  
    const total = lavado + parqueo + tienda + ropa;
  
    f.get('valor_factura')?.setValue(total, { emitEvent: false });
  }
}
