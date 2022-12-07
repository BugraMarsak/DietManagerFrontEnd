
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodListModel } from '../model/food-list-model';
import { ListResponseModel } from '../model/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FoodListService {
  url:string = "https://localhost:7240/api/FoodList"
  constructor(private httpClient:HttpClient) { }

  getAllFoodList():Observable<ListResponseModel<FoodListModel>>{
    return this.httpClient.
    get<ListResponseModel<FoodListModel>>(this.url)
  }

  getAllFoodWithoutAllergens(clientId:number):Observable<ListResponseModel<FoodListModel>>{
    return this.httpClient.
    get<ListResponseModel<FoodListModel>>(`${this.url}/GetAllWithoutAllergens?Id=${clientId}`)
  }

}
