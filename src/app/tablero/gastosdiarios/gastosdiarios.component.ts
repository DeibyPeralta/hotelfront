import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosService } from '../services/usuarios.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-gastosdiarios',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatIconModule,
    MatNativeDateModule,],
  templateUrl: './gastosdiarios.component.html',
  styleUrl: './gastosdiarios.component.scss'
})
export class GastosdiariosComponent {

  gastoForm!: FormGroup;
  valorFormateado: string = '';
  gastos: any[] = [];

  constructor( private tableroService: UsuariosService ) { }

  ngOnInit() {
    this.gastoForm = new FormGroup({
      descripcion: new FormControl(''),
      valor: new FormControl(''),
      usuario: new FormControl(''),
    });

    this.gastoForm.get('valor')!.valueChanges.subscribe((val) => {
      this.formatearValor(val);
    });
    
    this.tableroService.getHistorialGastosDiarios().subscribe({
      next: (data) => {
        this.gastos = data;
      },
      error: (err) => {
        console.error('Error al cargar historial de gastos:', err);
      }
    });
  }

  formatearValor(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    const raw = valor.replace(/[^\d]/g, '');
    const formateado = raw ? '$ ' + parseInt(raw, 10).toLocaleString('es-CL') : '';
    this.valorFormateado = formateado;

    this.gastoForm.get('valor')!.setValue(raw, { emitEvent: false });
  }

  cancelar() {
    this.gastoForm.reset();
    this.valorFormateado = '';
  }

  guardar() {
    const descripcion = this.gastoForm.value.descripcion;
    const valorNumerico = Number(this.gastoForm.value.valor?.replace(/[^\d]/g, '') || 0);
    
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.gastoForm.value.usuario = decoded.nombre || decoded.correo || decoded.id; 
    }
    
    const body = {
      descripcion: descripcion,
      valor: valorNumerico, 
      usuario: this.gastoForm.value.usuario, 
    };

    this.tableroService.insertHistorialGastosDiarios(body).subscribe({
      next: () => {    
        this.gastoForm.reset();
        this.valorFormateado = '';
      },
      error: (err) => {
        console.error('Error al guardar el gasto:', err);
      }
    });
  }
}