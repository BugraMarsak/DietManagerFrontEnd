
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergen } from '../model/Allergen';
import { ListResponseModel } from '../model/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AllergenService {
  url:string = "https://localhost:7240/api/Allergen"
  
  constructor(private httpClient:HttpClient) { }

  getAllFoodList():Observable<ListResponseModel<Allergen>>{
    return this.httpClient.
    get<ListResponseModel<Allergen>>(`${this.url}/getall`)
  }

  

}
