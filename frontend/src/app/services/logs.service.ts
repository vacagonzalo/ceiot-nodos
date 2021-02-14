import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logs } from '../models/logs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  readonly url: string = `http://${environment.ipAddr}:8080/logs/`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll(): Promise<Logs> {
    return this.http.get(this.url, { observe: 'response' }).toPromise()
      .then(res => {
        let logs: Logs = <Logs>res.body;
        return logs;
      })
      .catch(error => {
        this.auth.logout();
        return <Logs>{};
      })
  }
}