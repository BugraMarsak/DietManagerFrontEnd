import { FoodListModel } from 'src/app/model/food-list-model';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'foodfilter'
})
export class FoodfilterPipe implements PipeTransform {

  transform(value:FoodListModel[],filterText:string):FoodListModel[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((p:FoodListModel)=>p.foodName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}