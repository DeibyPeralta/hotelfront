import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent {
  baseValue!: number;

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.loadBaseValue();
  }

  loadBaseValue(): void {
    this.usuarioService.getEfectivo().subscribe(
      (data) => {
        console.log(data);
        this.baseValue = data.total_efectivo;
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

  
}
