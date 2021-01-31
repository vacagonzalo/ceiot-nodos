import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly url: string = "http://localhost:8080/users";

  constructor(private http: HttpClient) { }

  getAll(): Promise<Users> {
    return this.http.get(`${this.url}/all`, { observe: 'response' }).toPromise()
      .then(res => {
        let users: Users = <Users>res.body;
        return users;
      })
      .catch(error => {
        return <Users>{};
      })
  }
}
