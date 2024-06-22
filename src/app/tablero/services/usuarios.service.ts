import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = 'http://localhost:3000';
  // baseUrl = 'https://hotel-valle.onrender.com';

  constructor(private http: HttpClient) { 

  }

  login(correo: any, password: any): Observable<any> {
    const body = { correo, password };
    return this.http.post(`${this.baseUrl}/usuarios/login`, body);
  }

  getMaxHab(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero/max-habitaciones`);
  }

  getHistorial(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero/historial`);
  }

  getDatosDeTablero(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero/vista-tablero`);
  }

  postAddDeTablero(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tablero/add-tablero`, body);
  }
  
  postaddHabitaciones(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tablero/add-habitaciones`, body);
  }

  getHabitaciones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero/habitaciones`);
  }

  postEditHabitacion(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tablero/editar-habitaciones`, body);
  }

  editar_tablero(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tablero/editar_tablero`, body);
  }

  posthistorialHabitacion(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tablero/historial-habitaciones`, body);
  }

  deleteHabitaciones(numHabitacion: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tablero/eliminar-habitaciones/${numHabitacion}`);
  }

  registro(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios/registro`, body);
  }

  updateSocio(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/socios/update_socios`, body);
  }

  getSocios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/socios/getsocios`);
  }
  
}
