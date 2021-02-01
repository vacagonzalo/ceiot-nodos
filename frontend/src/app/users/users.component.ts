import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  public list: Users;

  constructor(
    private userServ: UsersService,
    public auth: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.list = await this.userServ.getAll();
  }

  detail(name: string): void {
    this.router.navigate(['/users/details/', name]);
  }

  async reset(name: string) {
    await this.userServ.resetPassword(name);
  }

  newUser(): void {
    console.log('newUser')
    this.router.navigate(['/users/new']);
  }
}
