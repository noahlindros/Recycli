import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange: EventEmitter<boolean> = new EventEmitter();
  adminChange: EventEmitter<boolean> = new EventEmitter();

  private static LOCAL_STORAGE_USERNAME = "LOCAL_STORAGE_RECYCLI_USERNAME";
  public isAuthenticated: boolean = false;
  public isAdmin: boolean = false;
  
  public user: firebase.User;

  constructor(public angularFireAuth: AngularFireAuth) { }


 

}
