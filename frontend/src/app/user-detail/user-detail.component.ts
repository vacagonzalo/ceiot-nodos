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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServ: UsersService) { }

  ngOnInit(): void {
    this.fetchUser();
  }

  async fetchUser() {
    let name = this.route.snapshot.paramMap.get('name');
    this.user = await this.userServ.getOne(name);
  }

  back(): void {
    this.router.navigate(['users']);
  }

  async newRank() {
    await this.userServ.changeRank(this.user.name,this.user.rank);
    this.back();
  }

}
