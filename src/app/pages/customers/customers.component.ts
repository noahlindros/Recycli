import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Customer } from 'app/model/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  data: Date = new Date();
  customerList: Customer[] = null;

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


  reloadData() {

    let subscription_customers = this.db.list<Customer>('data/customers/').valueChanges().subscribe((result) => {

      console.log(result);
      this.customerList = result;      
      subscription_customers.unsubscribe();
    });



  }

}
