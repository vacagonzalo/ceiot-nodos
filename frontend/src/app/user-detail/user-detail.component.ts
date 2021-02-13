import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public user: User;
  private name: string;
  public rankError: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServ: UsersService) {
      this.rankError = false;
     }

  ngOnInit(): void {
    this.fetchUser();
  }

  async fetchUser() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.user = await this.userServ.getOne(this.name);
  }

  back(): void {
    this.router.navigate(['users']);
  }

  async newRank() {
    this.rankError = !(this.user.rank <= 3 && this.user.rank >= 0);
    if(!this.rankError) {
    await this.userServ.changeRank(this.user.name,this.user.rank);
    this.back();
    }
  }

  async deleteUser() {
    await this.userServ.deleteUser(this.name);
    this.back();
  }

}
