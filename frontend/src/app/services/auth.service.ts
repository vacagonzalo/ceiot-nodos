import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:8090/";

  constructor(private http: HttpClient) { }
  signIn(name: string, password: string): Promise<boolean> {
    return this.http.post(
      this.url,
      {
        name: name,
        password: password
      },
      {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        observe: 'response'
      })
      .toPromise()
      .then((res) => {
        if (res.status == 201) {
          let credentials = <Credentials>res.body;
          localStorage.setItem('user', credentials.user);
          localStorage.setItem('rank', credentials.rank.toString());
          localStorage.setItem('token', credentials.token);
          return true;
        } else {
          localStorage.clear();
          return false;
        }
      })
      .catch((error) => {
        localStorage.clear();
        return false;
      })
  }

  loggedIn() {
    return (!!localStorage.getItem('token') &&
      !!localStorage.getItem('rank') &&
      !!localStorage.getItem('user'));
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
