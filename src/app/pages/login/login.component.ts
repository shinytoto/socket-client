import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Serivces
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nombre = '';

  constructor(
    public webSocketService: WebsocketService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  ingresar() {
    this.webSocketService.loginWebSocket(this.nombre).then(() => {
      this._router.navigateByUrl('/mensajes');
    });
  }
}
