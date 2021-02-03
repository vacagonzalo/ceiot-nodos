import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  public user: User;

  constructor(
    private router: Router,
    private userServ: UsersService) {
    this.user = <User>{};
  }

  ngOnInit(): void { }

  back() { 
    this.router.navigate(['users']);
  }

  async newUser() {
    await this.userServ.createUser(this.user);
    this.back();
  }

}
