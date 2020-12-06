import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { PerformedPickup } from 'app/model/performedpickup.model';
import { Pickup } from 'app/model/pickup.model';
import { ScheduledPickup } from 'app/model/scheduledpickup.model';
import { AuthService } from 'app/services/auth.service';
import { DataService } from 'app/services/data.service';


@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {

  data: Date = new Date();
  pickupList: Pickup[] = null;

  performedPickupList: PerformedPickup[] = null;
  payedPickupList: PerformedPickup[] = null;
  scheduledPickups: ScheduledPickup[];
  scheduledPickupsDictionary = new Map<string, ScheduledPickup>();

  isCreatingPickup: boolean = false;
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

    this.ds.getScheduledPickups_observable().subscribe(result => {
      this.scheduledPickups = result;

      this.scheduledPickups.forEach(element => {
        this.scheduledPickupsDictionary.set(element.Key, element);
      });

      this.reloadData();
    });



  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('login');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  getPickupName(pickupKey: string) {

    let scheduledPickup = this.scheduledPickupsDictionary.get(pickupKey);

    if (scheduledPickup)
      return scheduledPickup.Name;

    return pickupKey;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior:"smooth"});
  }

  onPerformedPickup(aBookedPickup: Pickup) {



    this.db.database.ref('performedpickups/' + this.auth.user.uid).push()
      .then((pushref) => {


        let aPerformedPickup = new PerformedPickup(aBookedPickup);
        aPerformedPickup.PerformedByWho = "Noah Lindros";
        aPerformedPickup.PerformedTimestamp = new Date().getTime();
        aPerformedPickup.PaymentKey = new Date().getTime();
        aPerformedPickup.PaymentReceived = false;
        aPerformedPickup.Key = pushref.key;

        pushref.set(aPerformedPickup)
          .then((saveref) => {
            this.reloadData();
          })
          .catch((error) => {

          });




      })
      .catch((error) => {

      });


  }

  reloadData() {

    let subscription_scheduled = this.db.list<Pickup>('pickups/' + this.auth.user.uid).valueChanges().subscribe((result) => {

      console.log(result);
      this.pickupList = result;      
      subscription_scheduled.unsubscribe();
    });

    let subscription_performed = this.db.list<PerformedPickup>('performedpickups/' + this.auth.user.uid).valueChanges().subscribe((result) => {

      console.log(result);
      this.performedPickupList = result;
      subscription_performed.unsubscribe();
    });

    let subscription_payed = this.db.list<PerformedPickup>('payedpickups/' + this.auth.user.uid).valueChanges().subscribe((result) => {

      console.log(result);
      this.payedPickupList = result;
      subscription_payed.unsubscribe();
    });

  }
  onRemovePickup(aPickup: Pickup) {
    console.log(aPickup);
    this.db.object('pickups/' + this.auth.user.uid + "/" + aPickup.Key).remove()
      .then(result => {
        this.reloadData();
      })
      .catch(error => {

      });
  }

  onCreateNew() {

    this.router.navigate(['/addpickup']);


  }

}
