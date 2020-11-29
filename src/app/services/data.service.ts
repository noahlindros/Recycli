import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ScheduledPickup } from 'app/model/scheduledpickup.model';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class DataService {
  private _url: string;

  constructor(private db : AngularFireDatabase) {

    

  }

  getScheduledPickups_observable(): Observable<Array<ScheduledPickup>> {

    return from(this.getScheduledPickups_promise());

  }
  
  getScheduledPickups_promise(): Promise<Array<ScheduledPickup>> {
  
    return new Promise(resolve => {

      let sub = this.db.list<ScheduledPickup>('data/scheduledpickups/').valueChanges().subscribe((result) => {

        resolve(result)
        
        sub.unsubscribe();
      });

    });
    
  } 
  
}