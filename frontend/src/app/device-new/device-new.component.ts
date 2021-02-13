import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../models/device';
import { DevicesService } from '../services/devices.service';
@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.css']
})
export class DeviceNewComponent implements OnInit {
  public device: Device;
  public modbusError: boolean;
  public unitError: boolean;
  readonly regular = /^([h/t])/;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dServ: DevicesService) { 
      this.device = <Device>{};
      this.modbusError = false;
      this.unitError = false;
    }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['devices']);
  }

  async add() {
    this.unitError = !this.regular.test(this.device.unit);
    this.modbusError = this.device.modbus < 0;
    if(!(this.unitError || this.modbusError)) {
      await this.dServ.post(this.device);
      this.back();
    }
  }

}