import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { User } from '../models/user';
import { PipeData } from '../models/pipeData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly url: string = "http://localhost:8080/users";

  constructor(private http: HttpClient) { }

  getPipeData(): Promise<PipeData> {
    return this.http.get(
      `${this.url}/pipe-data`,
      { observe: 'response' }
    ).toPromise()
      .then(res => {
        console.log('then')
        let pipeData: PipeData = <PipeData>res.body;
        return pipeData;
      })
      .catch(error => {
        console.log(error);
        return <PipeData>{};
      })
  }

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

  resetPassword(name: string): Promise<boolean> {
    let endpoint: string = `${this.url}/reset-password/${name}`;
    return this.http.put(endpoint, {}).toPromise()
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      })
  }

  changePassword(
    name: string,
    oldPassword: string,
    newPassword): Promise<boolean> {
    let endpoint: string = `${this.url}/change/password`;
    return this.http.post(endpoint, {
      name: name,
      oldPassword: oldPassword,
      newPassword: newPassword
    }, { observe: 'response' }).toPromise()
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      })
  }

  deleteUser(name: string): Promise<boolean> {
    let endpoint: string = `${this.url}/delete-user/${name}`;
    return this.http.delete(endpoint, {}).toPromise()
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      })
  }

  createUser(user: User): Promise<boolean> {
    let endpoint: string = `${this.url}/new`;
    return this.http.post(endpoint, {
      name: user.name,
      email: user.email,
      password: 'reset',
      rank: user.rank
    }).toPromise()
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      })
  }
}
