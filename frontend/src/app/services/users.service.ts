import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { User } from '../models/user';

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

  getOne(name: string): Promise<User> {
    return this.http.get(`${this.url}/one/${name}`, { observe: 'response' }).toPromise()
      .then(res => {
        let user: User = <User>res.body;
        return user;
      })
      .catch(error => {
        return <User>{};
      })
  }

  changeRank(name: string, rank: number): Promise<boolean> {
    let endpoint: string = `${this.url}/change-rank/${name}/${rank}`;
    return this.http.put(endpoint, {}).toPromise()
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      })
  }
}
