import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Readings } from '../models/readings';


@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  public url = "http://localhost:8080/readings"

  constructor(private http: HttpClient) { }

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
