import { Appointment } from './model/appointment';
import { DietianClientLists } from './model/dietianClientLists';
import { AppointmentService } from './services/Appointment.service';
import { AlertDTO } from './model/alertDTO';
import { SignalrService } from './services/signalR.service';
import { TokenClaim } from './services/tokenclaim.service';
import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'DietManagerFrontEnd';
  navOn: boolean = false;
  display:boolean =false;
  date:Date;
  constructor(private router:Router,private tokenClaim:TokenClaim,private signalrService:SignalrService,private appointmentService:AppointmentService,
    private userService:UserService,private snackBar: MatSnackBar) {
  }
  checker:boolean;

  ngOnInit(): void {
    this.getAlerts();
    this.setSelectedDate()
    this.getCurrentDietian()
    setInterval(() => { this.getAlerts() }, 5000)
  }

  openNav() {
    this.navOn = !this.navOn;
  }

  getRouter(){
    if(this.router.url == "/login" || this.router.url == "/register"){
      return true;
    }
    else{return false}
    
  }
  check(){
    var x = localStorage.getItem("token")
    return x==null?true:false
  }
  getRole(){
    return this.tokenClaim.getclaims()=="Dietitian"?true:false;
  }
  getName(){
    return this.tokenClaim.getName();
  }
  logout(){
    localStorage.removeItem("token")
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }
  showDialog(){
    this.getHours()
    this.display = true;
  }
  closeDialog(){
    this.display = false;
  }

  alertCount:string="0";
  alerts:AlertDTO[]=[]
  getAlerts(){
    this.signalrService.getAlerts(+this.tokenClaim.getid()).subscribe(res=>{
      console.log(res);
      
      this.alertCount = res.data.length>9?"9+":res.data.length+"";
      this.alerts = res.data;
    })
  }

  avaibleHours:string[]=[]
  selectedDate:Date
  setSelectedDate(){
    let tempdate=new Date()
    tempdate.setDate(tempdate.getDate()+1)
   this.selectedDate =tempdate;
   
   
  }
  getHours(){

    
    this.avaibleHours=[];
    this.appointmentService.getTodayAppointmentHours(
      this.tokenClaim.getid(),
      this.selectedDate.getDate(),
      this.selectedDate.getMonth()+1,
      this.selectedDate.getFullYear())
    .subscribe(res=>{
      this.avaibleHours =res
      this.selectedDate.setMinutes(+res[0].split(":")[1])
      this.selectedDate.setHours(+res[0].split(":")[0]+3)
    })
  }
  types:String[]=["Measurement","Measurement && Talk"]
  typeName:string ="Measurement"
  save(){
    
    let appointment:Appointment={
      dietianId:this.Dietian.dietianId,
      clientId:this.tokenClaim.getid(),
      appointmentDate:this.selectedDate,
      appointmentType:this.typeName,
    }
    this.appointmentService.add(appointment).subscribe(res=>{
      this.display=false
      this.snackBar.open('Appointment made', 'Close', {
        duration: 3000
      });
    },resError=>{
      this.snackBar.open('could not get an appointment', 'Close', {
        duration: 3000
      });
    }
    
    )
  }

  modifySelectedDate(event:any){
    console.log(this.typeName);
    let temp = event.target.value.split(":")
    this.selectedDate.setMinutes(+temp[1])
    this.selectedDate.setHours(+temp[0]+3)
  }

  modifyType(event:any){
    
    this.typeName =event.target.value
    console.log(this.typeName);
  }
  chatPath="";
  Dietian:DietianClientLists;
  getCurrentDietian(){
    this.userService.getDieatianbyId(this.tokenClaim.getid()).subscribe(res=>{
      console.log(res);
      if(res.data != null){
        
        this.chatPath="/chat/"+res.data.dietianId
        this.Dietian = res.data        
      }
      else{
        this.Dietian={
          id:0,
          dietianId:0,
          clientId:0
        }
      }
      
    })
  }

}
