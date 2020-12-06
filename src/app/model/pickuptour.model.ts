import { PerformedPickup } from "./performedpickup.model";
import { Pickup } from "./pickup.model";

export class PickupTour
{
    constructor(){

    }
    public Key : string;
    public Name : string = "";
    public PlannedDate : Number;
    public PerformedDate : Number;
    public Done: boolean
    
    public PlannedPickups: Pickup[];
    public PerformedPickups: PerformedPickup[]; 
    
}