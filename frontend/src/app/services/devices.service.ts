import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Devices } from '../models/devices';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  public url = "http://localhost:8080/devices/"

  constructor(private http: HttpClient) { }

  getAll(): Promise<Devices> {
    return this.http.get(this.url, { observe: 'response' }).toPromise()
      .then(res => {
        let devices = <Devices>res.body;
        return devices;
      })
      .catch(error => {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        return false;
      })
  }

  delete(tag: string): Promise<boolean> {
    return this.http.delete(`${this.url}${tag}`, { observe: 'response' }).toPromise()
      .then(res => {
        return res.status == 202;
      })
      .catch(error => {
        console.log(error);
        return false;
      })
  }
}
