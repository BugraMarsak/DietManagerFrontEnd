import { ResponseModel } from './../model/responseModel';
import { DietianClientLists } from './../model/dietianClientLists';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientListDTO } from '../model/clientListDTO';

import { ListResponseModel } from '../model/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DietianClientListService {
  url:string = "https://localhost:7240/api/DietianClientLists"
  
  constructor(private httpClient:HttpClient) { }


  getByDietianId(id:number):Observable<ListResponseModel<ClientListDTO>>{ 
    console.log(this.url);
    
    return this.
    httpClient.
    get<ListResponseModel<ClientListDTO>>(`${this.url}/GetById?DietianId=${id}`)
  }
  update(dietianClientLists:DietianClientLists):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/update",dietianClientLists);
  }
}
