import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'app/model/customer.model';
import { PerformedPickup } from 'app/model/performedpickup.model';
import { Pickup } from 'app/model/pickup.model';
import { PickupTour } from 'app/model/pickuptour.model';
import { AuthService } from 'app/services/auth.service';
import { DataService } from 'app/services/data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-performpickupdetail',
  templateUrl: './performpickupdetail.component.html',
  styleUrls: ['./performpickupdetail.component.css']
})
export class PerformpickupdetailComponent implements OnInit {

  data: Date = new Date();
  pickupKey : string = null;
  pickupTour: PickupTour = null;
  
  subscription_active_tour : Subscription = null;
  dbref_active_tour: AngularFireObject<PickupTour>  = null;

  constructor( private route: ActivatedRoute, private db: AngularFireDatabase, private auth: AuthService, private router: Router, private ds: DataService) { }

  ngOnInit(): void {

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }


    this.route.params.subscribe(params => {

      this.pickupKey = params['key'];
      this.subscribeToData(this.pickupKey);
    });

    

  }

  onCloseTour(){
  

    this.pickupTour.Done = true;
    this.pickupTour.PerformedDate = new Date().getTime();
    this.db.object<PickupTour>('pickuptours/done/' + this.pickupTour.Key).set(this.pickupTour)
    .then((saveref) => {
      this.dbref_active_tour.remove()
      .then((result) =>{
        this.router.navigate(['/performpickup']);
      })
      
    })
    .catch((error) =>{

    });

    

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');

    this.unSubscribeToData();
  }



  unSubscribeToData() {

    this.subscription_active_tour.unsubscribe();
  }

  subscribeToData(pickupKey : string) {
    this.dbref_active_tour =  this.db.object<PickupTour>('pickuptours/active/' + pickupKey);
    
    this.subscription_active_tour = this.dbref_active_tour.valueChanges().subscribe((result) => {
      
      this.pickupTour = result;      
      
    });

  }

  onPerformedPickup(performedPickup: Pickup){
    console.log(performedPickup);

    const index: number = this.pickupTour.PlannedPickups.indexOf(performedPickup);
    this.pickupTour.PlannedPickups.splice(index, 1);

    if (this.pickupTour.PerformedPickups == null)
      this.pickupTour.PerformedPickups = new Array<PerformedPickup>();

    let aPerformedPickup = new PerformedPickup(performedPickup);
    aPerformedPickup.PerformedByWho = "Noah Lindros";
    aPerformedPickup.PerformedTimestamp = new Date().getTime();
    aPerformedPickup.PaymentKey = new Date().getTime();
    aPerformedPickup.PaymentReceived = false;

    this.pickupTour.PerformedPickups.push(aPerformedPickup);

    this.db.database.ref('performedpickups/' + aPerformedPickup.CustomerKey).push()
    .then((pushref) => {

      aPerformedPickup.Key = pushref.key;

      pushref.set(aPerformedPickup)
        .then((saveref) => {
          this.dbref_active_tour.set(this.pickupTour)
        })
        .catch((error) => {

        });

    })
    .catch((error) => {

    });


  }


}
