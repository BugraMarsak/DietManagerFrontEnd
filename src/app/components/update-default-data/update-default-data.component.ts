import { MatSnackBar } from '@angular/material/snack-bar';
import { DietianClientLists } from './../../model/dietianClientLists';
import { DieatianDTO } from './../../model/DieatianDTO';
import { UserService } from './../../services/user.service';
import { ClientDefaultData } from './../../model/clientDefaultData';
import { TokenClaim } from './../../services/tokenclaim.service';
import { MeasurementResultService } from './../../services/measurement-result.service';
import { Component, OnInit } from '@angular/core';
import { DietianClientListService } from 'src/app/services/dietian-client-list.service';

@Component({
  selector: 'app-update-default-data',
  templateUrl: './update-default-data.component.html',
  styleUrls: ['./update-default-data.component.scss']
})
export class UpdateDefaultDataComponent implements OnInit {

  constructor(
    private measurementResultService:MeasurementResultService,
    private tokenClaim:TokenClaim,
    private userService:UserService,
    private dietianClientListService:DietianClientListService,
    private snackBar: MatSnackBar
  ) { }
  data:ClientDefaultData
  dietians:DieatianDTO[]
  selectedDietian:DietianClientLists
  ngOnInit(): void {
    this.getData()
    this.getDietians();
  }
  //user info
  getData(){
    this.measurementResultService.getClientDefData(this.tokenClaim.getid()).subscribe(res=>{
      this.data = res.data;
    })
  }
  
  update(){
    this.measurementResultService.updatedef(this.data).subscribe(res=>{
      this.snackBar.open('Updated', 'Close', {
        duration: 5000
      });
    },reserror=>{
      this.snackBar.open('a problem has occurred', 'Close', {
        duration: 5000
      });
    });
  }
  //user info


  // user dieatian info
  getDietians(){
   
   
    this.userService.getDieatians().subscribe(res=>{
      this.dietians = res.data
      this.setCurrentDietian()
    })
  }
  setCurrentDietian(){
    this.userService.getDieatianbyId(this.tokenClaim.getid()).subscribe(res=>{
      if(res.data != null){
        this.selectedDietian = res.data
        console.log(res);
        
      }
      
    })
  }
  updateDieatian(){
    this.dietianClientListService.update(this.selectedDietian).subscribe(res=>{
      this.snackBar.open('Updated', 'Close', {
        duration: 5000
      });
    },reserror=>{
      this.snackBar.open('a problem has occurred', 'Close', {
        duration: 5000
      });
    });
  }
  //user dieatian info
}
