import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public oldPassword:string;
  public newPassword:string;
  public newPassword2:string;

  constructor(private router: Router, private userServ: UsersService) { 
    this.user = <User>{};
    this.oldPassword = "";
    this.newPassword = "";
    this.newPassword2 = "";
  }

  ngOnInit(): void {
    this.fetchUser();
   }

  async fetchUser() {
    this.user = await this.userServ.getOne(localStorage.getItem('user'));
  }

  back() {
    this.router.navigate(['home']);
  }

  async changePassword() {
    if(this.newPassword!= "" && this.newPassword == this.newPassword2) {
      await this.userServ.changePassword(
        localStorage.getItem('user'),
        this.oldPassword,
        this.newPassword);
      this.back();
    }
  }

}
