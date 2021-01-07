import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: string;
  public rank: string;
  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.rank = localStorage.getItem('rank');
  }

}
