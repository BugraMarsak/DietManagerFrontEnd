import { Appointment } from './../../model/appointment';
import { AppointmentService } from './../../services/Appointment.service';
import { UserService } from './../../services/user.service';
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private allergenService:AllergenService,
    private clientAlergiesService:ClientAlergiesService,
    private appointmentService:AppointmentService,
    private tokenClaim:TokenClaim,
    private userService:UserService,
    private measurementResultService:MeasurementResultService,
    private clientDietListService:ClientDietListService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
    
  ) { }

  pdfUrl: SafeResourceUrl;
  allergens:Allergen[];
  allergenArray:string[];
  allergenNameArray:string[]=[];
  x:any[]=[]
  data:ClientAllergies;
  clientDefaultData:ClientDefaultData
  dietList:ClientDietList[]=[]
  clientDietList:ClientDietList[]
  profileId:number
  ngOnInit(): void {
    this.profileId = this.tokenClaim.getid()
    this.GetAllergens()
    this.getClientAllergies()
    this.getClientInfo()
    this.getDietLists()
    this.getPdfFilesNames()
    this.getNextAppointment();
  }
  
  // Client Allergies start
  GetAllergens(){
    this.allergenService.getAllFoodList().subscribe(res=>{
      this.allergens = res.data;
      
    })
  }

  getClientAllergies(){
    this.clientAlergiesService.getByClientId(this.profileId).subscribe(res=>{
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
  age:string = ""
  gender:string =""
  getClientInfo(){
    this.measurementResultService.getClientDefData(this.profileId).subscribe(res=>{
      this.clientDefaultData = res.data;
      this.age = ""+res.data.age;
      this.gender = res.data.gender;
      console.log(+this.clientDefaultData.height.toString().split(".")[1]<10);
      if(+this.clientDefaultData.height.toString().split(".")[1]<10){
        this.height = (this.clientDefaultData.height+"0")
      }else{
        this.height =res.data.height+""
      }
    })
  }
  // Client Info end


  //Diet list start

  getDietLists(){
    this.clientDietListService.getDietListByClientId(this.profileId).subscribe(res=>{
      
      
      this.clientDietList =res.data

    })
  }

 //Diet list end

 openDialog(i:number) {
  this.clientDietListService.getDietListBySessionAndClientId(this.profileId,i).subscribe(res=>{
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

  display: boolean = false;

  PDFFilesNames:string[]=[]
  getPdfFilesNames(){
    this.userService.getPdfFilesNames(this.profileId).subscribe(res=>{
      console.log(res);
      this.PDFFilesNames = res
    })
  }

  getSession(session:number){
    this.clientDietListService.getDietListBySessionAndClientId(this.profileId,session).subscribe(res=>{
      this.dietList = res.data;
      console.log(res.data);
      
      this.showDialog();
    })
  }

  getPdf(fileName:string){
    console.log(this.pdfUrl );
    this.userService.getPdfByName(this.profileId,fileName).subscribe(res=>{
        const fileUrl = URL.createObjectURL(res);
        setTimeout(() => {
          console.log(fileUrl);
        }, 100);
        
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
        console.log(fileUrl);
        console.log(this.pdfUrl);
      setTimeout(() => {
        this.showDialog3()
      }, 100);
      
    })
    // 
  }
  setPdfUrl(){
    window.location.reload()
  }

  display2:boolean = false;
  display3:boolean = false;
  showDialog() {
    this.display = true;
  }
  showDialog2() {
    this.display2 = true;
  }
  showDialog3() {
    this.display3 = true;
  }
  uploadedFiles: any[] = [];
  onUpload(event:any) {
    console.log(123);
    
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

}

  downloadPdf(){
    let pdfName = this.clientDietList[0].dietDate.toString().substring(0,10)+"_DietList";
    var doc = new jspdf({format: 'a4'});
    html2canvas(document.getElementById("diet-list-pdf"), {
    scale: 5
    }).then(canvas => {
    let imgFile = canvas;
    doc.addImage(imgFile, "JPEG", 5, 5, 200, 285);
    doc.save(pdfName + ".pdf");
    });
    

  }

  appointment?:Appointment
  getNextAppointment(){
    this.appointmentService.getUserNextAppointment(this.profileId).subscribe(res=>{
      console.log(res);
      
      this.appointment =res;
    })
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