import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Pickup } from 'app/model/pickup.model';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {

  pickupList: Pickup[]  = null;

  constructor(private db : AngularFireDatabase, private auth: AuthService) { }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }


    this.reloadData();
    
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  reloadData(){
    let subscription = this.db.list<Pickup>('pickups/' + this.auth.user.uid).valueChanges().subscribe((result) => {

      this.pickupList = result;
      subscription.unsubscribe();
    });


  }
  onCreateNew(){

    let aNewPickup = new Pickup();
    aNewPickup.Name = "Fredrik";
    aNewPickup.Address1 = "Sidensvansgatan 22";
    aNewPickup.Address2 = "";
    aNewPickup.Zip = "235 38";
    aNewPickup.City = "VELLINGE";
    aNewPickup.PickupDay = "Måndagar udda veckor";
    aNewPickup.Phone = "+46 733 354302";
    
    let subscription = this.db.list<Pickup>('pickups/' + this.auth.user.uid).push(aNewPickup)
    .then((ref) =>{

      this.reloadData();
    })
    .catch((error) =>{

    });
    
  }
}
