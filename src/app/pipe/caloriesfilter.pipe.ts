import { ClientListDTO } from './../model/clientListDTO';
import { Pipe, PipeTransform } from '@angular/core';
import { FoodListModel } from '../model/food-list-model';


@Pipe({
  name: 'caloriesfilter'
})
export class CaloriesfilterPipe implements PipeTransform {

  transform(value:FoodListModel[],filterText:string):FoodListModel[] {
    filterText = filterText.toString()!='0'?filterText.toString().toLocaleLowerCase():""
    return filterText?value.filter((p:FoodListModel)=>p.calories.toString().toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}