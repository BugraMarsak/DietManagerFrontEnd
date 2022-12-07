import { ClientListDTO } from './../../model/clientListDTO';

import { Component, OnInit } from '@angular/core';
import { DietianClientLists } from 'src/app/model/dietianClientLists';

import { DietianClientListService } from 'src/app/services/dietian-client-list.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  ClientLists:ClientListDTO[] = [];
  filterText = ""
  constructor(private dietianClientListService:DietianClientListService) { }

  ngOnInit(): void {
    this.getClients(12);
  }

  getClients(Id:number){
      this.dietianClientListService.getByDietianId(Id).subscribe(res=>{
        this.ClientLists = res.data;
        console.log(res);
        
      })
  }

}
