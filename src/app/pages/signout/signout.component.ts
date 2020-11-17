import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {


  data: Date = new Date();

  
  
  



  constructor(private auth: AuthService) { }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }


    this.auth.isAuthenticated = false;
    this.auth.user = null;
    this.auth.authChange.emit(false);
    
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }


}
