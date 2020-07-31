import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

// Models
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket) {
    this.cargarStorage();
    this.checkStatus();
  }

  // *Revisar el estado del servidor
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al Servidor.');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del Servidor.');
      this.socketStatus = false;
    });
  }

  // *Emitir cualquier evento al servidor
  emitir(evento: string, payload?: any, callback?: CallableFunction) {
    this.socket.emit(evento, payload, callback);
  }

  // *Escuchar cualquier evento
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  // *Emitir evento que lleva el payload del nombre
  loginWebSocket(nombre: string) {
    return new Promise((resolve, reject) => {
      this.emitir('configurar-usuario', { nombre }, (response) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();

        resolve();
      });
    });

    // this.socket.emit('configurar-usuario', { nombre }, (response) => {
    //   console.log(response);
    // });
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWebSocket(this.usuario.nombre);
    }
  }
}
