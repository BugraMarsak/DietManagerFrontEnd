import { ClientDefaultData } from './../model/clientDefaultData';
import { MeasurementResult } from './../model/measurementResult';
import { SingleResponseModel } from '../model/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../model/listResponseModel';
import { ResponseModel } from '../model/responseModel';
import { ClientAllergies } from '../model/clientAllergies';

@Injectable({
  providedIn: 'root'
})
export class MeasurementResultService {
  url:string = "https://localhost:7240/api/ClientMeasurement"
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
  getbyIdLastMeas(Id:number):Observable<SingleResponseModel<MeasurementResult>>{
    let newPath=this.url+"/getbyIdLastMeas?userId="+Id
    return this.httpClient.get<SingleResponseModel<MeasurementResult>>(newPath);
  }
  getClientDefData(Id:number):Observable<SingleResponseModel<ClientDefaultData>>{
    let newPath=this.url+"/getClientDefData?userId="+Id
    return this.httpClient.get<SingleResponseModel<ClientDefaultData>>(newPath);
  }
  adddef(clientDefaultData:ClientDefaultData):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/adddef",clientDefaultData);
  }
  deletedef(clientDefaultData:ClientDefaultData):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/deletedef",clientDefaultData);
  }
  updatedef(clientDefaultData:ClientDefaultData):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/updatedef",clientDefaultData);
  }
}
