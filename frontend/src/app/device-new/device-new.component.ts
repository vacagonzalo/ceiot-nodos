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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dServ: DevicesService) { 
      this.device = <Device>{};
    }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['devices']);
  }

  async add() {
    await this.dServ.post(this.device);
    this.back();
  }

}
