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
    private tokenClaim:TokenClaim
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
    }
  }

  savex(){
    this.data.AllergiesList = this.setfordata(this.allergenArray);
    console.log('this is data : ',this.data);
    
    this.clientAlergiesService.update(this.data).subscribe(res=>{
      console.log(res);
      
    });
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
