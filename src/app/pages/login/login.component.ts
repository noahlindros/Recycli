import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  data : Date = new Date();

  constructor(private router: Router) { }

  onLoginClick()
  {      
      this.router.navigate(['/dashboard']);
   }
  ngOnInit() {
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('full-screen');
      body.classList.add('login');
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
      if (navbar.classList.contains('nav-up')) {
          navbar.classList.remove('nav-up');
      }
  }
  ngOnDestroy(){
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('full-screen');
      body.classList.remove('login');
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
  }

}
