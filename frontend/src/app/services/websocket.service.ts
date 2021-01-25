import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
export const WS_ENDPOINT = "ws://127.0.0.1:9999";

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


