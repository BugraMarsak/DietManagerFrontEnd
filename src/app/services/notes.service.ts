import { Notes } from './../model/Notes';
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
export class NotesService {
  url:string = "https://localhost:7240/api/Notes"
  constructor(private httpClient:HttpClient) { }

  getByIds(clientId:number,dietianId:number):Observable<ListResponseModel<Notes>> {
    let newPath=this.url+"/GetByIds?clientId="+clientId+"&dietianId="+dietianId
    return this.httpClient.get<ListResponseModel<Notes>>(newPath);
  }
  add(notes:Notes):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/add",notes);
  }
  delete(notes:Notes):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/delete",notes);
  }
  update(notes:Notes):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url+"/update",notes);
  }

}
