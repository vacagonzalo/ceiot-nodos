import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
export const WS_ENDPOINT = `ws://${environment.ipAddr}:9999`;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  public connect(): WebSocketSubject<any> {
    return webSocket({
      url: WS_ENDPOINT,
      deserializer: ({data}) => data
    });
  }

}


