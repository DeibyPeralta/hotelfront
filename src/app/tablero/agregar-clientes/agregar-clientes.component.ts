import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.scss']
})
export class AgregarClientesComponent {

  constructor( private usuariosService: UsuariosService ) {  }

  onCapture() {
    this.usuariosService.captureFingerprint().subscribe(data => {
      console.log('Fingerprint Data:', data);
    });
  }
}
