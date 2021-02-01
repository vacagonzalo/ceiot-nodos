import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logs } from '../models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  readonly url: string = "http://localhost:8080/logs/";
  constructor(private http: HttpClient) { }

  getAll(): Promise<Logs> {
    return this.http.get(this.url, { observe: 'response' }).toPromise()
      .then(res => {
        let logs: Logs = <Logs>res.body;
        return logs;
      })
      .catch(error => {
        return <Logs>{};
      })
  }
}
