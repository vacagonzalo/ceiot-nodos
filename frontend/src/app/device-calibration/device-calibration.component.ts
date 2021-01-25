import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-device-calibration',
  templateUrl: './device-calibration.component.html',
  styleUrls: ['./device-calibration.component.css']
})
export class DeviceCalibrationComponent implements OnInit {
  
  constructor(private service: WebsocketService) { }

  ngOnInit(): void {
    this.service.connect().subscribe(
      msg => console.log('message received: ' + msg),
      err => console.log(err),
      () => console.log('complete')
    );
  }

}
