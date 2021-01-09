import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { Devices } from '../models/devices';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  public list: Devices;
  constructor(private dServ: DevicesService) { }

  ngOnInit(): void {
    this.updateDeviceList();
  }

  async updateDeviceList() {
    this.list = await this.dServ.getAll();
  }
}
