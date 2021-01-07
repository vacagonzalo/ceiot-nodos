import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  public url = "http://localhost:8080/devices"

  constructor(private http: HttpClient) { }

  getAll(): Promise<Array<Device>> {
    return this.http.get(this.url, { observe: 'response' }).toPromise()
      .then(res => {
        let devices = <Array<Device>>res.body;
        return devices;
      })
      .catch(error => {
        console.log(error);
        return new Array<Device>();
      });
  }
}
