import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('register-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
}
ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('register-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
}

}

function checkPass(){
  var pass  = (<HTMLInputElement>document.getElementById("password")).value;
  var rpass  = (<HTMLInputElement>document.getElementById("rpassword")).value;
 if(pass != rpass){
     (<HTMLInputElement>document.getElementById("submit")).disabled = true;
     $('.missmatch').html("Det angivna lösenordet matchar inte");
 }else{
     $('.missmatch').html("");
     (<HTMLInputElement>document.getElementById("submit")).disabled = false;
 }
}