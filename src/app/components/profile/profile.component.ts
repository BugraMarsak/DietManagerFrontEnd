import { ClientDietList } from 'src/app/model/clientDietList';
import { ClientDietListService } from './../../services/client-diet-list.service';
import { MeasurementResultService } from './../../services/measurement-result.service';
import { ClientDefaultData } from './../../model/clientDefaultData';
import { Allergen } from 'src/app/model/Allergen';
import { AllergenService } from 'src/app/services/alergen.service';
import { ClientAllergies } from 'src/app/model/clientAllergies';
import { TokenClaim } from './../../services/tokenclaim.service';
import { ClientAlergiesService } from './../../services/client-alergies.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private allergenService:AllergenService,
    private clientAlergiesService:ClientAlergiesService,
    private tokenClaim:TokenClaim,
    private measurementResultService:MeasurementResultService,
    private clientDietListService:ClientDietListService,
    public dialog: MatDialog,
    
  ) { }


  allergens:Allergen[];
  allergenArray:string[];
  allergenNameArray:string[]=[];
  x:any[]=[]
  data:ClientAllergies;
  clientDefaultData:ClientDefaultData

  clientDietList:ClientDietList[]
  ngOnInit(): void {
    this.GetAllergens()
    this.getClientAllergies()
    this.getClientInfo()
    this.getDietLists()
  }
  
  // Client Allergies start
  GetAllergens(){
    this.allergenService.getAllFoodList().subscribe(res=>{
      this.allergens = res.data;
      
    })
  }

  getClientAllergies(){
    this.clientAlergiesService.getByClientId(this.tokenClaim.getid()).subscribe(res=>{
      this.data = res.data
      this.setNames()
    })
  }
  setNames(){
    for(let i=0;i<this.data.allergenArray.length;i++){      
      let tempData= this.allergens.find(x=>x.id == +this.data.allergenArray[i])
      if(tempData !=null){
        this.allergenNameArray.push(tempData.allergenName);
      }
    }
  }
  // Client Allergies end

  // Client Info start
  height:string = ""
  getClientInfo(){
    this.measurementResultService.getClientDefData(this.tokenClaim.getid()).subscribe(res=>{
      this.clientDefaultData = res.data;
      if(+this.clientDefaultData.height.toString().split(".")[1]<10){
        this.height = (this.clientDefaultData.height+"0")
        
      }

      
    })
  }
  // Client Info end


  //Diet list start

  getDietLists(){
    this.clientDietListService.getDietListByClientId(this.tokenClaim.getid()).subscribe(res=>{
      this.clientDietList =res.data

    })
  }

 //Diet list end

 openDialog(i:number) {
  this.clientDietListService.getDietListBySessionAndClientId(this.tokenClaim.getid(),i).subscribe(res=>{
    console.log(res);
    
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      width: '330px',
      height: '400px',
      data: {
        dataKey: res.data
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  })
  
  }
  test1(){
   let modal = document.getElementById('myModal');
    modal.style.display = "block";
  }


}
import { BrowserModule } from '@angular/platform-browser'
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

export class DialogContentExampleDialog {

constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
  
  
}

}