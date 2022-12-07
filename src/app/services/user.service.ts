import { DietianClientLists } from './../model/dietianClientLists';
import { ClientDefaultData } from '../model/clientDefaultData';
import { MeasurementResult } from '../model/measurementResult';
import { SingleResponseModel } from '../model/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../model/listResponseModel';
import { ResponseModel } from '../model/responseModel';
import { ClientAllergies } from '../model/clientAllergies';
import { DieatianDTO } from '../model/DieatianDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = "https://localhost:7240/api/user"
  constructor(private httpClient:HttpClient) { }

  getByClientId(Id:number):Observable<ListResponseModel<MeasurementResult>> {
    let newPath=this.url+"/getbyId?userId="+Id
    return this.httpClient.get<ListResponseModel<MeasurementResult>>(newPath);
  }
  add(measurementResult:MeasurementResult):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/add",measurementResult);
  }
  delete(measurementResult:MeasurementResult):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/delete",measurementResult);
  }
  update(measurementResult:MeasurementResult):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/update",measurementResult);
  }
  setDietatian(clientId:number,dietianId:number):Observable<SingleResponseModel<MeasurementResult>>{
    let newPath=this.url+"/setDietatian?DieatianId="+dietianId+"&ClientId="+clientId
    return this.httpClient.get<SingleResponseModel<MeasurementResult>>(newPath);
  }
  getDieatians():Observable<ListResponseModel<DieatianDTO>>{
    let newPath=this.url+"/getDieatians"
    return this.httpClient.get<ListResponseModel<DieatianDTO>>(newPath);
  }
  getDieatianbyId(clientId:number):Observable<SingleResponseModel<DietianClientLists>>{
    let newPath=this.url+"/getDieatianbyId?ClientId="+clientId
    return this.httpClient.get<SingleResponseModel<DietianClientLists>>(newPath);
  }

}
