import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = environment.baseUrl;
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

  actualizarHistorial(body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tablero/update-historial`, body);
  }

  getHistorialFilter(filtros?: { socio?: string, destino?: string, fechasistema?: string }): Observable<any> {
    let params: any = {};
    if (filtros) {
      if (filtros.socio) params.socio = filtros.socio;
      if (filtros.destino) params.destino = filtros.destino;
      if (filtros.fechasistema) params.fechasistema = filtros.fechasistema;
    }
    return this.http.get(`${this.baseUrl}/tablero/historial-graficos`, { params });
  }

  getDatosDeTablero(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero/vista-tablero`);
  }
  
  getPermisos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/permisos`);
  }
  
  editPermisos(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/edit-permisos`, body);
  }
  
  deleteUsers(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuarios/delete-users/${id}`);
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

  getHabitacionesDisponibles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero//habitaciones-disponibles`);
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

  posthistorialEfectivo(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tablero/cuadre-caja`, body);
  }
  
  deleteHabitaciones(numHabitacion: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tablero/eliminar-habitaciones/${numHabitacion}`);
  }

  registro(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios/registro`, body);
  }

  updateSocio(datos: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', datos);
    return this.http.post<any>(`${this.baseUrl}/socios/updatesocios`, formData);
  }

  update_Socio(dato: any): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}/socios/update-socios`, dato);
  }

  getSocios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/socios/getsocios`);
  }
  
  getEfectivo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tablero/flujo-efectivo`);
  }

  insertEfectivo(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tablero/efectivo`, body);
  }

  updateBase(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tablero/update-base`, body);
  }

  getHistorialCaja(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero/historial-caja`);
  }

  insertHistorialGastosDiarios(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tablero/insert-gastos-diarios`, body);
  }
  
  getHistorialGastosDiarios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tablero/get-all-gastos-diarios`);
  }
  
  totalHistorialGastosDiarios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tablero/total-gastos-diarios`);
  }

  obtenerBusPorInterno(interno: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tablero/interno-placa/${interno}`);
  }
  
}
