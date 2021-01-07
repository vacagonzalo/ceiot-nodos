import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public name: string = "";
  public password: string = "";
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  async login() {
    let res:boolean;
    res = await this.auth.signIn(this.name, this.password);
    this.router.navigate(['home']);
  }
}
