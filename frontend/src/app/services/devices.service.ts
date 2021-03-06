import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Devices } from '../models/devices';
import { Device } from '../models/device';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  readonly url = `http://${environment.ipAddr}:8080/devices/`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll(): Promise<Devices> {
    return this.http.get(this.url, { observe: 'response' }).toPromise()
      .then(res => {
        let devices = <Devices>res.body;
        return devices;
      })
      .catch(error => {
        this.auth.logout();
        return <Devices>{};
      });
  }

  getOne(tag: string): Promise<Device> {
    return this.http.get(`${this.url}${tag}`, { observe: 'response' }).toPromise()
      .then(res => {
        let device = <Device>res.body;
        return device;
      })
      .catch(error => {
        this.auth.logout();
        return <Device>{};
      });
  }

  put(device: Device): Promise<boolean> {
    return this.http.put(`${this.url}${device.serial}`, {
      tag: device.tag,
      modbus: device.modbus,
      frec: device.frec,
      unit: device.unit
    }, { observe: 'body' }).toPromise()
      .then(res => {
        return true;
      })
      .catch(err => {
        return false;
      })
  }

  post(device: Device): Promise<boolean> {
    return this.http.post(`${this.url}`, {
      serial: device.serial,
      tag: device.tag,
      modbus: device.modbus,
      frec: device.frec,
      unit: device.unit
    }, { observe: 'body' }).toPromise()
      .then(res => {
        let newDevice = <Device>res;
        if (newDevice) {
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        return false;
      })
  }

  delete(tag: string): Promise<boolean> {
    return this.http.delete(`${this.url}${tag}`, { observe: 'response' })
      .toPromise()
      .then(res => {
        return res.status == 202;
      })
      .catch(error => {
        return false;
      })
  }

  calibrateMode(tag: string): Promise<boolean> {
    return this.http.put(`${this.url}${tag}/calibration`,
      {})
      .toPromise()
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      })
  }

  defaultMode(tag: string): Promise<boolean> {
    return this.http.put(`${this.url}${tag}/default-mode`,
      {})
      .toPromise()
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      })
  }
}