import { ResponseModel } from './../model/responseModel';
import { Appointment } from './../model/appointment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergen } from '../model/Allergen';
import { ListResponseModel } from '../model/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  url:string = "https://localhost:7240/api/appointment"
  
  constructor(private httpClient:HttpClient) { }

  getAllAppointments():Observable<ListResponseModel<Allergen>>{
    return this.httpClient.
    get<ListResponseModel<Allergen>>(`${this.url}/getall`)
  }


  getTodayAppointments(dietianId:number,day:number,month:number,year:number):Observable<ListResponseModel<Appointment>>{
    return this.httpClient.
    get<ListResponseModel<Appointment>>(`${this.url}/GetTodayAppointments?dietianId=${dietianId}&day=${day}&month=${month}&year=${year}`)
  }
  
  getTodayAppointmentHours(userId:number,day:number,month:number,year:number){
    return this.httpClient.
    get<string[]>(`${this.url}/GetTodayAppointmentHours?clientId=${userId}&day=${day}&month=${month}&year=${year}`)
  }
  getUserNextAppointment(clientId:number){
    return this.httpClient.
    get<Appointment>(`${this.url}/getUserNextAppointment?clientId=${clientId}`)
  }

  add(appointment:Appointment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/add",appointment);
  }

}
