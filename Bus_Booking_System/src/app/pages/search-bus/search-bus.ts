import { Component, inject, OnInit } from '@angular/core';
import { BusService } from '../../Service/bus-service';
import { BusRoute } from '../../../interface/BusRoute';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BusLocation } from '../../../interface/BusLocation';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bus',
  imports: [DatePipe,FormsModule],
  templateUrl: './search-bus.html',
  styleUrl: './search-bus.css'
})
export class SearchBus implements OnInit {
private busService=inject(BusService)
private router= inject(Router)
busRoutes:BusRoute[]=[]
busLocations:BusLocation[]=[]

 fromLocationIdModel: number | null = null;
  toLocationIdModel: number | null = null;
  dateModel: string = '';


 ngOnInit(): void {
  this.busService.getBusRoute().subscribe(

    (data)=>{
      this.busRoutes= data
    },
    (err)=>{
      console.error(err)
    }
  );
  this.getLocations();
  console.log(this.busLocations)
 }
 
 selectTrip(bus: BusRoute) {
    console.log(bus);

    // Format date to yyyy-MM-dd
    const formattedDate = bus.scheduleDate.split('T')[0]; // safer for ISO strings
    //find fromLocationId from locationName
  const fromLocation = this.busLocations.find(loc => loc.locationName === bus.fromLocationName);
  const toLocation = this.busLocations.find(loc => loc.locationName === bus.toLocationName);

  const fromLocationId = fromLocation ? fromLocation.locationId : 0;
  const toLocationId = toLocation ? toLocation.locationId : 0;
  console.log(fromLocationId+"  to  "+toLocationId)
  if(fromLocationId===toLocationId)
  {
    alert(bus.fromLocationName+" to "+bus.toLocationName+" are Same");
  }
  else
  {
    this.router.navigate([
      '/book-ticket',
      fromLocationId,
      toLocationId,
      formattedDate
    ]);
  }
  }

searchBus()
 {
  if(this.fromLocationIdModel===this.toLocationIdModel)
  {
  alert(this.fromLocationIdModel
  +" to "+ this.toLocationIdModel+" are Same");

  console.log( this.fromLocationIdModel,
     this.toLocationIdModel,
     this.dateModel)
  }
else
  {
  this.router.navigate([
      '/book-ticket',
      this.fromLocationIdModel,
     this.toLocationIdModel,
     this.dateModel
    ]);
  }
  
 }

 getLocations()
 {
  this.busService.getBusLocation().subscribe(
    (data)=>{
     this.busLocations= data
    },
    (err)=>{
      console.log(err)
    }
  )
 }

 }




 

