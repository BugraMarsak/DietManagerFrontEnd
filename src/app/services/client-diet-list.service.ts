
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDietList } from '../model/clientDietList';
import { ClientListDTO } from '../model/clientListDTO';
import { DietianClientLists } from '../model/dietianClientLists';
import { ListResponseModel } from '../model/listResponseModel';
import { ResponseModel } from '../model/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ClientDietListService {
  url:string = "https://localhost:7240/api/ClientDietList"
  
  constructor(private httpClient:HttpClient) { }


  getByDietianId(id:number):Observable<ListResponseModel<ClientListDTO>>{     
    return this.
    httpClient.
    get<ListResponseModel<ClientListDTO>>(`${this.url}/GetById?DietianId=${id}`)
  }
  add(clientDietList:ClientDietList[]):Observable<ResponseModel>{    
    console.log(clientDietList);
    
    return this.httpClient.post<ResponseModel>(this.url+"/add",clientDietList);
  }
  delete(clientDietList:ClientDietList):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/delete",clientDietList);
  }
  update(clientDietList:ClientDietList):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/update",clientDietList);
  }

  getDietListByClientId(id:number):Observable<ListResponseModel<ClientDietList>>{ 
    return this.
    httpClient.
    get<ListResponseModel<ClientDietList>>(`${this.url}/getDietListByClientId?ClientId=${id}`)
  }
  getDietListBySessionAndClientId(id:number,session:number){
    return this.
    httpClient.
    get<ListResponseModel<ClientDietList>>(`${this.url}/getDietListBySessionAndClientId?ClientId=${id}&Session=${session}`)
  }


}
