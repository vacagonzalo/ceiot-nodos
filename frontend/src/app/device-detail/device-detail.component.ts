import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../models/device';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
  public device: Device;
  public modbusError: boolean;
  public unitError: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dServ: DevicesService) { 
      this.modbusError = false;
      this.unitError = false;
    }

  ngOnInit(): void {
    this.fetchDevice();
  }

  async fetchDevice() {
    let tag = this.route.snapshot.paramMap.get('tag');
    this.device = await this.dServ.getOne(tag);
  }

  back() {
    this.router.navigate(['devices']);
  }

  async edit() {
    this.unitError = !(this.device.unit == 't' || this.device.unit == 'h');
    this.modbusError = !(this.device.modbus >= 0);
    if(!(this.unitError) || (this.modbusError)) {
    await this.dServ.put(this.device);
    this.back();
    }
  }

  async erase() {
    await this.dServ.delete(this.device.tag);
    this.back();
  }
}
