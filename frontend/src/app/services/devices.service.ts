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
        console.log("error en parseo?")
        console.log(error);
        return <Device>{};
      });
  }
}
