import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public list: Users;

  constructor(private service:UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.list = await this.service.getAll();
  }

}
