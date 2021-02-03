import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter<any>();
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void { 
  }
  
  toggleSideBar() {
    if (this.auth.loggedIn()){
      this.toggleSideBarForMe.emit();
    } else {
      this.router.navigate(['login']);
    }
  }

}
