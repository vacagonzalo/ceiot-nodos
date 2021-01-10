import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { Devices } from '../models/devices';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  public list: Devices;
  constructor(private dServ: DevicesService, private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.updateDeviceList();
  }

  async updateDeviceList() {
    this.list = await this.dServ.getAll();
  }

  detail(tag) {
    this.router.navigate(['/devices', tag, 'detail']);
  }

  readings(tag) {
    this.router.navigate(['/devices', tag, 'readings']);
  }

  calibrate(tag) {
    this.router.navigate(['/devices', tag, 'calibration']);
  }
}
