import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Device } from '../models/device';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
  public name: string = "";
  public password: string = "";

  public device: Device;

  constructor(
    private auth: AuthService,
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

  async login() {
    let res: boolean;
    res = await this.auth.signIn(this.name, this.password);
    this.router.navigate(['home']);
  }
}
