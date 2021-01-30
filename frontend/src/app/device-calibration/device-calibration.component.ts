import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-device-calibration',
  templateUrl: './device-calibration.component.html',
  styleUrls: ['./device-calibration.component.css']
})
export class DeviceCalibrationComponent implements OnInit {

  public liveData$: string[];
  public lastMeasurement$: string;
  public tag: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: WebsocketService) {
    this.liveData$ = new Array<string>();
    this.lastMeasurement$ = "";
    this.tag = "";
  }

  ngOnInit(): void {
    this.tag = this.route.snapshot.paramMap.get('tag');
    this.service.connect().subscribe(
      msg => {
        let foo = msg.split(',');
        let device = foo[0];
        let measurement = foo[1];
        console.log(`${device} - ${this.tag}`);
        if(device == this.tag) {
          let now = new Date();
          this.lastMeasurement$ = `${measurement}@${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
          this.liveData$.push(this.lastMeasurement$);
        }
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  back() {
    this.router.navigate(['devices']);
  }

}
