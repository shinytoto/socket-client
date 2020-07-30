import { Component } from '@angular/core';

// Services
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(public webSocketService: WebsocketService) {}
}
