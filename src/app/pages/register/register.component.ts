import { Component, OnInit, ViewChild } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
//import firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginFailed: boolean = false;
  errorMessage: string = "";


  constructor(public auth: AuthService) {

  }

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),    
    password: new FormControl('', [Validators.required,
    Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/)
    ]),
    confirm: new FormControl('', [Validators.required,
    Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/)
    ]),
  });


  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('register-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('register-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }


  onReactiveFormSubmit() {
    console.log(this.signupForm);

    this.loginFailed = false;


    if (!this.signupForm.value.email) {
      this.loginFailed = true;
      this.errorMessage = "You must provide a valid email address";
      return;
    }



    if (!this.signupForm.value.password) {
      this.loginFailed = true;
      this.errorMessage = "You must provide a password";
      return;
    }
    else {
      let pwd: string = this.signupForm.value.password;
      if (pwd.length < 6) {
        this.loginFailed = true;
        this.errorMessage = "Your password must be at least 8 characters long";
        return;
      }
      else {
        let confirm: string = this.signupForm.value.confirm;
        if (pwd != confirm) {
          this.loginFailed = true;
          this.errorMessage = "You must confirm your password";
          return;
        }
      }
    }

    this.auth.angularFireAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
    .then((user) => {
      console.log(user);
      this.loginFailed = true;
      this.errorMessage = user.user.uid;

      
      this.auth.user = user;
      this.auth.isAuthenticated = true;
      this.auth.authChange.emit(true);
      
    })
    .catch((error) => {
      console.log(error);
      this.errorMessage = error.code + " " + error.message;
      this.loginFailed = true;
      

      this.auth.isAuthenticated = false;
      this.auth.user = null;
      this.auth.authChange.emit(true);

    });


  }

}

