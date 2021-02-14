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
  public rankError: boolean;
  public emailError: boolean;
  readonly regular= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private router: Router,
    private userServ: UsersService) {
    this.user = <User>{};
    this.rankError = false;
    this.emailError = false;
  }

  ngOnInit(): void { }

  back() { 
    this.router.navigate(['users']);
  }

  async newUser() {
    this.emailError = !(this.regular.test(this.user.email.toLowerCase()));
    this.rankError = !(this.user.rank <= 3 && this.user.rank >= 0);
    if(!(this.emailError || this.rankError)) {
      await this.userServ.createUser(this.user);
      this.back();
    }
  }

}
