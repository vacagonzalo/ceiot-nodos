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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dServ: DevicesService) { }

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
    await this.dServ.put(this.device);
    this.back();
  }

  async erase() {
    await this.dServ.delete(this.device.tag);
    this.back();
  }
}
