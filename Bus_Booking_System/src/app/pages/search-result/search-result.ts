import { Component, inject, OnInit } from '@angular/core';
import { BusService } from '../../Service/bus-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusDetail } from '../../../interface/busDetail';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-result',
  imports: [DatePipe,FormsModule],
  templateUrl: './search-result.html',
  styleUrl: './search-result.css'
})
export class SearchResult implements OnInit {

  private busService= inject(BusService);
  private routerNav= inject(Router);
  private router=inject(ActivatedRoute)
  totalPrice:number=0;
  seatNumbers:number[]=[]
  selectedSeats: number[] = [];
  scheduleId:number | null  =null;
  customerDetails: { [seat: string]: { name: string; email: string; phone: string } } = {
     1: { name: '', email: '', phone: '' }
  };
  busDetail:BusDetail={
    scheduleId: 0,
    vendorId: 0,
    busName: '',
    busVehicleNo: '',
    fromLocation: 0,
    toLocation: 0,
    departureTime: '',
    arrivalTime: '',
    scheduleDate: '',
    price: 0,
    totalSeats: 0
  }
  ngOnInit(): void {

    this.router.paramMap.subscribe(
      (data)=>{
        this.scheduleId= Number(data.get('scheduleId'));
        console.log(data.get('scheduleId'));
        console.log("scheduleId: "+this.scheduleId)
      }
    )
   // throw new Error('Method not implemented.');

   this.busService.getBusdetail(this.scheduleId?this.scheduleId:0).subscribe(
    (data)=>
    {
        this.busDetail= data

        for(let i=1; i<=this.busDetail.totalSeats;i++ )
        {
          this.seatNumbers.push(i);
        }
    }
   );
   this.seatNumbers.forEach(seat => {
    this.customerDetails[seat] = { name: '', email: '', phone: '' };
  });
   console.log(this.busDetail)
  }
  toggleSeat(seat: number) {
  const index = this.selectedSeats.indexOf(seat);
   this.totalPrice+=this.busDetail.price;
  if (index === -1) {
    this.selectedSeats.push(seat);
    this.customerDetails[seat] = { name: '', email: '', phone: '' };
    this.totalPrice=this.totalPrice + this.busDetail.price;
  } else {
    this.totalPrice -= this.busDetail.price;
    console.log(this.busDetail.price)
    console.log(this.totalPrice)
    this.selectedSeats.splice(index, 1);
    delete this.customerDetails[seat];
  }
}

}
