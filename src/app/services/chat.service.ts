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
      de: this.webSocketService.getUsuario().nombre,
      cuerpo: mensaje,
    };

    this.webSocketService.emitir('mensaje', payload);
  }

  getMessages() {
    return this.webSocketService.listen('mensaje-nuevo');
  }

  getMessagesPrivate() {
    return this.webSocketService.listen('mensaje-privado');
  }

  getGlobalMessages() {
    return this.webSocketService.listen('mensaje-global');
  }
}
