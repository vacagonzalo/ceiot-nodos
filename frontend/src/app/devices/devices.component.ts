import { Component, OnInit, OnChanges } from '@angular/core';
import { Device } from '../models/device';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit, OnChanges {
  public devices: Array<Device>;
  constructor(private dServ: DevicesService) { }

  ngOnInit(): void {
    this.updateDeviceList();
    console.log(`devices: ${this.devices}`);
  }

  ngOnChanges() {
    this.updateDeviceList();
    console.log(`devices: ${this.devices}`);
  }

  async updateDeviceList() {
    this.devices = await this.dServ.getAll();
  }
}
