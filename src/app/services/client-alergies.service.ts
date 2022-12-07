import { SingleResponseModel } from './../model/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../model/listResponseModel';
import { ResponseModel } from '../model/responseModel';
import { ClientAllergies } from '../model/clientAllergies';

@Injectable({
  providedIn: 'root'
})
export class ClientAlergiesService {
  url:string = "https://localhost:7240/api/ClientAllergies"
  constructor(private httpClient:HttpClient) { }

  getByClientId(Id:number):Observable<SingleResponseModel<ClientAllergies>> {
    let newPath=this.url+"/getbyId?userId="+Id
    return this.httpClient.get<SingleResponseModel<ClientAllergies>>(newPath);
  }
  add(clientAllergies:ClientAllergies):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/add",clientAllergies);
  }
  delete(clientAllergies:ClientAllergies):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/delete",clientAllergies);
  }
  update(clientAllergies:ClientAllergies):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/update",clientAllergies);
  }
  CreateAllergiesList(){

  }
}
