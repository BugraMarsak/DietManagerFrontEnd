import { ClientListDTO } from './../model/clientListDTO';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'clientfilter'
})
export class ClientfilterPipe implements PipeTransform {

  transform(value:ClientListDTO[],filterText:string):ClientListDTO[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((p:ClientListDTO)=>p.clientFullName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}