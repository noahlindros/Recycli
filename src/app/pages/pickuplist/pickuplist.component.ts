import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Customer } from 'app/model/customer.model';
import { Pickup } from 'app/model/pickup.model';
import { ScheduledPickup } from 'app/model/scheduledpickup.model';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-pickuplist',
  templateUrl: './pickuplist.component.html',
  styleUrls: ['./pickuplist.component.css']
})
export class PickuplistComponent implements OnInit {

  data: Date = new Date();
  pickupList: Pickup[] = null;
  scheduledPickupsDictionary = new Map<string, ScheduledPickup>();
  scheduledPickups: ScheduledPickup[];

  constructor(private db: AngularFireDatabase, private ds: DataService) { }

  ngOnInit(): void {

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }


    this.ds.getScheduledPickups_observable().subscribe(result => {
      this.scheduledPickups = result;

      this.scheduledPickups.forEach(element => {
        this.scheduledPickupsDictionary.set(element.Key, element);
      });

      this.reloadData();
    });


    

  }

  getPickupName(pickupKey: string) {

    let scheduledPickup = this.scheduledPickupsDictionary.get(pickupKey);

    if (scheduledPickup)
      return scheduledPickup.Name;

    return pickupKey;
  }



  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }


  reloadData() {

    //Create a list of all pickups
    let subscription_all_pickups = this.db.list('pickups/').valueChanges().subscribe((result) => {
      
      //create a list of all pickups
      let resultAllPickups = new Array<Pickup>();


      result.forEach(customerKey => {        
        Object.entries(customerKey).map(([k, v]) => {    
          resultAllPickups.push(v);                  
        });        
      });      


      this.pickupList =  resultAllPickups;

      subscription_all_pickups.unsubscribe();

              
    });


  }

}
