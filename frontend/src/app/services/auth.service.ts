import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/credentials';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url: string = `http://${environment.ipAddr}:8080/auth/`;

  constructor(private http: HttpClient, private router: Router) { }
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

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRank() {
    return localStorage.getItem('rank');
  }

  getUser() {
    return localStorage.getItem('user');
  }
}
