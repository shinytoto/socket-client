import { Injectable } from '@angular/core';

// Services
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public webSocketService: WebsocketService) {}

  sendMessage(mensaje: string) {
    const payload = {
      de: 'Nicolás Córdoba Campos',
      cuerpo: mensaje,
    };

    this.webSocketService.emitir('mensaje', payload);
  }

  getMessages() {
    return this.webSocketService.listen('mensaje-nuevo');
  }
}
