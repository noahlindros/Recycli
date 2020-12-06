import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Customer } from 'app/model/customer.model';
import { PerformedPickup } from 'app/model/performedpickup.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  data: Date = new Date();
  performedPickups: PerformedPickup[] = null;

  constructor(private db: AngularFireDatabase) { }

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


  onPerformPayment(performedPickup : PerformedPickup){

    performedPickup.PaymentReceived = true;
    performedPickup.PaymentTimestamp = new Date().getTime();



    this.db.database.ref('payedpickups/' + performedPickup.CustomerKey + "/" + performedPickup.Key).set(performedPickup)
      .then((setref) => {

        let  dbref = this.db.database.ref("performedpickups/" + performedPickup.CustomerKey + "/" + performedPickup.Key);
        console.log(dbref);
        dbref.remove()
        .then((removeResult) => {
          console.log(removeResult);
          this.reloadData();
        })
        .catch((error) => {

        });
  
        
      })
      .catch((error) => {

      });



  }

  reloadData() {

    
    let subscription_performed_pickups = this.db.list('performedpickups/').valueChanges().subscribe((result) => {

      
      let resultPerformedPickups = new Array<PerformedPickup>();

      result.forEach(customerKey => {        
        Object.entries(customerKey).map(([k, v]) => {    
            resultPerformedPickups.push(v);
                  
        });        
      });
      
      this.performedPickups = resultPerformedPickups;

      console.log(this.performedPickups);
      subscription_performed_pickups.unsubscribe();
    });


    

  }

}
