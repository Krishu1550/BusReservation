import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../Service/bus-service';
import { BusInfo } from '../../../interface/BusInfo';

@Component({
  selector: 'app-book-ticket',
  imports: [],
  templateUrl: './book-ticket.html',
  styleUrl: './book-ticket.css'
})
export class BookTicket implements OnInit {

  private routerParam = inject(ActivatedRoute);
  private busService= inject(BusService)
  private router= inject(Router)

  from: number = 0;
  to: number = 0;
  date: string = '';
  busInfos:BusInfo[]=[]

  ngOnInit(): void {
    this.routerParam.params.subscribe((params) => {
      this.from = +params['from'];
      this.to = +params['to'];
      this.date = params['date'];
      this.busService.getBusService( this.from,this.to,this.date).subscribe(
        (data)=>
        {
          this.busInfos=data

          console.log(data)
        },
        (err)=>{
          console.log(err)
        }
      )
      console.log(this.date);
    });
  }

    navigateBus(bus:BusInfo)
    {
      this.router.navigate(["search-result",bus.scheduleId])
    }
}
