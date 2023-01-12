import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenClaim } from './../../services/tokenclaim.service';
import { ClientAlergiesService } from './../../services/client-alergies.service';
import { Component, OnInit } from '@angular/core';
import { Allergen } from 'src/app/model/Allergen';
import { AllergenService } from 'src/app/services/alergen.service';
import { ClientAllergies } from 'src/app/model/clientAllergies';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.scss']
})
export class AllergiesComponent implements OnInit {

  allergens:Allergen[];
  selectedOpt:number;
  allergenArray:string[];
  allergenNameArray:string[]=[];
  data:ClientAllergies;

  constructor(
    private allergenService:AllergenService,
    private clientAlergiesService:ClientAlergiesService,
    private tokenClaim:TokenClaim,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.GetAllergens()
    this.getClientAllergies()
  }

  GetAllergens(){
    this.allergenService.getAllFoodList().subscribe(res=>{
      this.allergens = res.data;
      console.log(res.data);
      
    })
  }

  getClientAllergies(){
    this.clientAlergiesService.getByClientId(this.tokenClaim.getid()).subscribe(res=>{
      this.allergenArray = res.data.allergenArray;
      this.data = res.data
      this.setNames()
    })
  }

  setNames(){
    this.allergenArray.forEach(item=>{
      let tempData= this.allergens.find(x=>x.id+'' == item)
      if(tempData !=null){
        this.allergenNameArray.push(tempData.allergenName);
      }
    })

  }

  test(x:any){
    this.selectedOpt = x.target.value
  }

  updatex(){
    console.log(this.selectedOpt);
    
    let tempData= this.allergens.find(x=>x.id == this.selectedOpt) 
    let sameItem = this.allergenNameArray.find(x=>x==tempData.allergenName) 
    if(tempData !=null && sameItem == null){
      this.allergenNameArray.push(tempData.allergenName);
      this.allergenArray.push(this.selectedOpt+'');
      this.snackBar.open('Added List do NOT forget SAVE', 'Close', {
        duration: 5000
      });
    }
    else if(sameItem != null){
      this.snackBar.open('That food already in the list!', 'Close', {
        duration: 5000
      });
    }
  }

  savex(){
    this.data.AllergiesList = this.setfordata(this.allergenArray);
    console.log('this is data : ',this.data);
    
    this.clientAlergiesService.update(this.data).subscribe(res=>{
      this.snackBar.open('Allergie List saved', 'Close', {
        duration: 5000
      });
    },reserror=>{
      this.snackBar.open('a problem has occurred', 'Close', {
        duration: 5000
      });
    });
      
  }

  deleteFromArray(name:string){
    console.log(name);
    console.log(this.allergenNameArray.findIndex(x=>x == name));
    
    let tempData = this.allergens.find(x=>x.allergenName ==name).id
    console.log(this.allergenArray.findIndex(x=>x == tempData+""));
    this.allergenNameArray.splice(this.allergenNameArray.findIndex(x=>x == name),1);
    this.allergenArray.splice(this.allergenArray.findIndex(x=>x == tempData+""),1);
    console.log(this.allergenArray);
    
  }

  setfordata(x:string[]){
    var res = ""
    x.forEach(element => {
      if(res==""){
        res = element;
      }
      else{
        res += ","+element
      }
    });
    return res;
  }

}
