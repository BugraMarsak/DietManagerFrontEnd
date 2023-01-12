import { MatSnackBar } from '@angular/material/snack-bar';
import { Notes } from './../../model/Notes';
import { ClientDefaultData } from './../../model/clientDefaultData';
import { MeasurementResultService } from './../../services/measurement-result.service';
import { TokenClaim } from './../../services/tokenclaim.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FoodListService } from 'src/app/services/food-list.service';
import { FoodListModel } from 'src/app/model/food-list-model';
import { ActivatedRoute } from '@angular/router';
import { ClientDietList } from 'src/app/model/clientDietList';
import { ClientDietListService } from 'src/app/services/client-diet-list.service';
import { MeasurementResult } from 'src/app/model/measurementResult';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-diet-list-maker',
  templateUrl: './diet-list-maker.component.html',
  styleUrls: ['./diet-list-maker.component.scss']
})
export class DietListMakerComponent implements OnInit {

  constructor(
    private foodListService:FoodListService,
    private activatedRoute:ActivatedRoute,
    private clientDietListService:ClientDietListService,
    private measurementResultService:MeasurementResultService,
    private tokenClaim:TokenClaim,
    private notesService:NotesService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getClientId()
    
  }
  
  foodFilter:string=""
  calorieFilter:string=""

  todo:FoodListModel[] = [];
  temparr:FoodListModel[]=[];
  done:FoodListModel[][] = [[]];
  testtt:number[][]=[[15,1,5,4],[3,11,15,24]]
  clientId:number;
  hourMinHolder:string[][]=[["00","00"]] 
  hours:string[]=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
  min:string[]=["00","10","20","30","40","50"]
  lastMeas:MeasurementResult;
  clientDefData:ClientDefaultData
  drop(event: CdkDragDrop<any[]>) {
    console.log(1);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    
    this.todo = this.temparr.slice(0)
  }

  getClientId(){
    this.activatedRoute.params.subscribe(params =>{
      this.clientId = params["clientId"];
      this.getFoodList(params["clientId"]);
      this.getNotes()
      this.getClientInfo(params["clientId"]);
    })
  }

  getFoodList(clientId:number){
    console.log(clientId);
    
    this.foodListService.getAllFoodWithoutAllergens(clientId).subscribe((res)=>{
      this.temparr = res.data.slice(0);
      this.todo = res.data;
      

    })
  }


  age:string="";
  gender:string="";
  height:string="";
  bki:string="";
  weight:string="";
  ika:string="";
  getClientInfo(id:number){
    this.measurementResultService.getbyIdLastMeas(id).subscribe(res=>{
      this.lastMeas=res.data
      this.bki = res.data.bki+""
      this.weight = res.data.weight+""
      this.ika = res.data.ika +""
    })
    this.measurementResultService.getClientDefData(id).subscribe(res=>{
      this.clientDefData = res.data      
      this.age = ''+res.data.age
      this.gender = ''+res.data.gender
      if(+res.data.height.toString().split(".")[1]<10){
        this.height = (res.data.height+"0")
      }else{
        this.height = res.data.height+""
      }
       
    })
  }

  hourChange(event:any,i:number){
    this.hourMinHolder[i][0] = event.target.value
  }
  minChange(event:any,i:number){
    this.hourMinHolder[i][1] = event.target.value
  }

  test(){
    this.done.push([])
    console.log(this.done);
    this.hourMinHolder.push(["00","00"])
    console.log(this.hourMinHolder);
  }

  saveDietList(){
    
    
    let tempArray:ClientDietList[]=[]

    for(let i=0;i<this.done.length;i++){
      let res:string=""
      let now = new Date();
      for(let j=0;j<this.done[i].length;j++){
        if(j==0){
          res=this.done[i][j].id+""
        }
        else{
          res+=","+this.done[i][j].id
        }
      }
      now.setHours(+this.hourMinHolder[i][0]);
      now.setMinutes(+this.hourMinHolder[i][1]);
      console.log(now);
      let resx:ClientDietList = { id:0,
        dietitianId:+this.tokenClaim.getid(),
        clientId:+this.clientId,
        dietInfo:res,
        dietDate:now,
        note:" ",
        session:0,
        foodNames:['']
      }
      tempArray.push(resx);
      
      
    }
    console.log(tempArray);
    
      this.clientDietListService.add(tempArray).subscribe(res=>{
        this.snackBar.open('Diet List saved', 'Close', {
          duration: 5000
        });
      },reserror=>{
        this.snackBar.open('a problem has occurred', 'Close', {
          duration: 5000
        });
      });
  }
  display:boolean=false;
  display2:boolean=false;
  notesList:Notes[]=[]
  getNotes(){
    this.notesService.getByIds(this.clientId,this.tokenClaim.getid()).subscribe(res=>{
    this.notesList = res.data;
    console.log(res.data[0]);
  })
  }

  noteName:string="";
  note:string=" ";
  saveNotes(){
    let tempNote:Notes={
    notesName:this.noteName,
    note:this.note,
    dietianId:this.tokenClaim.getid(),
    clientId:this.clientId
    };

    this.notesService.add(tempNote).subscribe(res=>{
      this.snackBar.open('Note saved', 'Close', {
        duration: 5000
      });
    },reserror=>{
        this.snackBar.open('a problem has occurred', 'Close', {
          duration: 5000
        });
      });
    this.display2=false;
  }


  selectedNote:Notes
  showDialog(item:Notes){
    this.selectedNote = item
    this.display=true;
  }

  showDialog2(){
    
    this.display2=true;
    setTimeout(() => {
      let input = document.querySelector('.p-inputtextarea') as HTMLElement | null;;
      if(input !=null){
        input.focus()
      }
    }, 50);
    

  }
  deleteThis(i:number){
    let temparr = this.done.slice(0)
    temparr.splice(i,1)
    this.done = temparr;
    let temparr2 = this.hourMinHolder.slice(0)
    temparr2.splice(i,1)
    this.hourMinHolder = temparr2;
  }


}
