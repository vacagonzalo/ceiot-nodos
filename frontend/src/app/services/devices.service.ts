import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device';
import { Devices } from '../models/devices';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  public url = "http://localhost:8080/devices/"

  constructor(private http: HttpClient) { }

  getAll(): Promise<Devices> {
    return this.http.get(this.url, { observe: 'response' }).toPromise()
      .then(res => {
        let devices = <Devices> res.body;
        return devices;
      })
      .catch(error => {
        console.log(error);
        return <Devices>{};
      });
  }
}
