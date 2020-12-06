import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Customer } from 'app/model/customer.model';
import { Pickup } from 'app/model/pickup.model';
import { PickupTour } from 'app/model/pickuptour.model';
import { AuthService } from 'app/services/auth.service';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-performpickup',
  templateUrl: './performpickup.component.html',
  styleUrls: ['./performpickup.component.css']
})
export class PerformpickupComponent implements OnInit {

  data: Date = new Date();
  pickupTour: PickupTour[] = null;
  performedPickupTour: PickupTour[] = null;

  constructor(private db: AngularFireDatabase, private auth: AuthService, private router: Router, private ds: DataService) { }

  ngOnInit(): void {

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


  onClickPickupTour(tour: PickupTour)
  {
    console.log(tour);
    this.router.navigate(['performpickup', tour.Key]);
  }
  reloadData() {

    let subscription_active_tours = this.db.list<PickupTour>('pickuptours/active').valueChanges().subscribe((result) => {

      console.log(result);
      this.pickupTour = result;      
      subscription_active_tours.unsubscribe();
    });

    let subscription_performed_tours = this.db.list<PickupTour>('pickuptours/done').valueChanges().subscribe((result) => {

      console.log(result);
      this.performedPickupTour = result;      
      subscription_performed_tours.unsubscribe();
    });

  }

  onCreateNewPickup(){

    //Create a list of all pickups
    let subscription_all_pickups = this.db.list('pickups/').valueChanges().subscribe((result) => {
      
      //create a list of all pickups
      let resultAllPickups = new Array<Pickup>();


      result.forEach(customerKey => {        
        Object.entries(customerKey).map(([k, v]) => {    
          resultAllPickups.push(v);                  
        });        
      });      

      subscription_all_pickups.unsubscribe();

      //create a new pickuptoour
      this.db.database.ref('pickuptours/active').push()
        .then((pushref) =>{

          let aNewTour = new PickupTour();

          aNewTour.Key = pushref.key;
          aNewTour.PlannedDate = new Date().getTime();
          aNewTour.Name = "Hämtlista";
          aNewTour.PlannedPickups = resultAllPickups;
          pushref.set(aNewTour)
              .then((saveref) =>{
                console.log(saveref);
                this.reloadData();
              })
              .catch((error) =>{
          
              });
          
        })
        .catch((error) =>{

        });

        
      this.reloadData();
      
    });

    
    

  }

}
