import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pickup } from 'app/model/pickup.model';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-addpickup',
  templateUrl: './addpickup.component.html',
  styleUrls: ['./addpickup.component.css']
})
export class AddpickupComponent implements OnInit {


  data: Date = new Date();

  @ViewChild('FormData') SignInForm: NgForm;
  loginFailed: boolean = false;
  errorMessage: string = null;
  newpickup: Pickup = new Pickup();


  constructor(private db : AngularFireDatabase, private auth: AuthService, private router: Router) { }

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
    
    

    console.log(this.newpickup);





    
    this.db.database.ref('pickups/' + this.auth.user.uid).push()
    .then((pushref) =>{

      console.log(pushref);

      this.newpickup.Key = pushref.key;

      pushref.set(this.newpickup)
      .then((saveref) =>{
        console.log(saveref);
        this.router.navigate(['/pickup']);
      })
      .catch((error) =>{
  
      });
      


      
    })
    .catch((error) =>{

    });

    /*

    let subscription = this.db.list<Pickup>('pickups/' + this.auth.user.uid).push(aNewPickup)
    .then((ref) =>{
      console.log(ref);
      this.reloadData();
    })
    .catch((error) =>{

    });
    */


   

  }

}
