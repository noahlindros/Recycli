import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { DataService } from 'app/services/data.service';
import { Pickup } from 'app/model/pickup.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})


export class DashboardComponent implements OnInit {

  data : Date = new Date();
  pickupList: Pickup[] = null;

  constructor(private db: AngularFireDatabase, private auth: AuthService, private router: Router, private ds: DataService) { }
  
  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }

    let subscription_scheduled = this.db.list<Pickup>('pickups/' + this.auth.user.uid).valueChanges().subscribe((result) => {

      console.log(result);
      this.pickupList = result;      
      subscription_scheduled.unsubscribe();
    });
    
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  onCreateNew() {

    this.router.navigate(['/addpickup']);


  }
}
