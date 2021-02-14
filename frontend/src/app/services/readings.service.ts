import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Readings } from '../models/readings';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  readonly url = `http://${environment.ipAddr}:8080/readings`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllReadings(tag: string): Promise<Readings> {
    return this.http.get(`${this.url}/all/${tag}`, { observe: 'response' })
      .toPromise()
      .then(res => {
        let readings: Readings = <Readings>res.body;
        return readings;
      })
      .catch(err => {
        console.log(err);
        return <Readings>{}
      })
  }

  getYearReadings(tag: string): Promise<Readings> {
    return this.http.get(`${this.url}/year/${tag}`, { observe: 'response' })
      .toPromise()
      .then(res => {
        let readings: Readings = <Readings>res.body;
        return readings;
      })
      .catch(err => {
        console.log(err);
        return <Readings>{}
      })
  }
}
