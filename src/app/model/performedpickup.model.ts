import { abort } from "process";
import { Pickup } from "./pickup.model";

export class PerformedPickup extends Pickup
{
    constructor(aBookedPickup : Pickup){
        super();

        this.Key = aBookedPickup.Key;
        this.Address1 = aBookedPickup.Address1;
        this.Address2 = aBookedPickup.Address2;
        this.City = aBookedPickup.City;
        this.Instruction = aBookedPickup.Instruction;
        this.Name = aBookedPickup.Name;
        this.Phone = aBookedPickup.Phone;
        this.Zip = aBookedPickup.Zip;
        this.ScheduledPickupKey = aBookedPickup.ScheduledPickupKey;
    }

    public PerformedTimestamp : Number;
    public PerformedByWho : string;
    public PaymentReceived: boolean;
    public PaymentKey: Number;
}