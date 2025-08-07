import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { get } from 'http';
import { InteropObservable, Observable } from 'rxjs';
import { BusLocation } from '../../interface/BusLocation';
import { BusRoute } from '../../interface/BusRoute';
import { BusInfo } from '../../interface/BusInfo';
import { BusDetail } from '../../interface/busDetail';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient)
  {

  }

    getAllBuses() {
    return this.http.get(`${this.baseUrl}/buses`);
  }

  getBusById(id: number) {
    return this.http.get(`${this.baseUrl}/buses/${id}`);
  }

  //https://api.freeprojectapi.com/api/BusBooking/GetBusLocations



  getBusLocation():Observable<BusLocation[]>
  {
      
    return this.http.get<BusLocation[]>(`${this.baseUrl}GetBusLocations`);
  }

  //https://api.freeprojectapi.com/api/BusBooking/searchBus

  getBusService(from:number, to:number, date:string): Observable<BusInfo[]>
  {
    return this.http.get<BusInfo[]>(`${this.baseUrl}searchBus?fromLocation=${from}&toLocation=${to}&travelDate=${date}`)
  }
  
  getBusRoute():Observable<BusRoute[]>
  {
    return this.http.get<BusRoute[]>(`${this.baseUrl}GetAvailableRoutes`)
  }
  getBusdetail(scheduleId:number):Observable<BusDetail>
  {
    return this.http.get<BusDetail>
    (`${this.baseUrl}GetBusScheduleById?id=${scheduleId}`)
  }
  

}
