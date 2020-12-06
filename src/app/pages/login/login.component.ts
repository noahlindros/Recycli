import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  data: Date = new Date();

  @ViewChild('FormData') SignInForm: NgForm;
  loginFailed: boolean = false;
  errorMessage: string = null;



  constructor(private auth: AuthService, private router: Router) { }

  onLoginClick() {
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
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  onSubmit(FormData: NgForm) {
    this.loginFailed = false;
    this.auth.angularFireAuth.auth.signInWithEmailAndPassword(FormData.value.email, FormData.value.password)
      .then((user) => {

  
        
        this.auth.isAuthenticated = true;
        this.auth.user = user.user;
        this.auth.authChange.emit(true);
        this.router.navigate(['/dashboard']);


      }).catch((error) => {        
        this.errorMessage = error.code + " " + error.message;
        this.loginFailed = true;
        
        this.auth.isAuthenticated = false;
        this.auth.isAdmin  = false;
        this.auth.user = null;
        this.auth.authChange.emit(false);
        this.auth.adminChange.emit(false);
      });
  }

}
