import { UserService } from './../../services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MeasurementResult } from './../../model/measurementResult';
import { ActivatedRoute } from '@angular/router';
import { MeasurementResultService } from './../../services/measurement-result.service';
import { Component, OnInit } from '@angular/core';


import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  WeightDataY:number[] = []
  bKIDataY:number[]=[]
  dateArrayX:string[] = []
  bodyFatRatioDataY:number[]=[]
  ikaDataY:number[]=[]
  lastMes:MeasurementResult
  clientId:number
  display:boolean=false
  constructor(
    private measurementResultService:MeasurementResultService,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
this.getClientId()
let date = new Date();
this.graph1 = {
  
  data: [
    { x:  [date.setDate(2),date.setDate(4),date.setDate(7)], y:[2,4,5], type: 'scatter' },
  ],
  layout: {title: 'Weight Data'}
};
this.graph2 = {
  data: [
    { x:[date.setDate(2),date.setDate(4),date.setDate(7)], y:[7,1,5], type: 'scatter' },
  ],
  layout: {title: 'IKA Data'}
};
this.graph3 = {
  data: [
    { x:  [date.setDate(2),date.setDate(4),date.setDate(7)], y:[4,4,9], type: 'scatter' },
  ],
  layout: {title: 'bodyFatRatio Data'}
};
this.graph4 = {
  data: [
    { x:  [date.setDate(2),date.setDate(4),date.setDate(7)], y:[3,2,4], type: 'scatter' },
  ],
  layout: {title: 'BKI Data'}
};
  }

  getClientId(){
    this.activatedRoute.params.subscribe(params =>{
      this.clientId = params["clientId"];
      this.x(params["clientId"]);
      this.setPdfUrl(params["clientId"])
    })
  }
  title = 'dynamic-plots';
  // Bar Chart
  graph1:any
  graph2:any
  graph3:any
  graph4:any
  visceralFatLevel:string=""
  targetVisceralFatLevel:string=""
  weight:string=""
  targetWeight:string=""
  bodyFatWeight:string=""
  mineral:string=""
  totalBodyWater:string=""
  protein:string=""
  x(id:number){
    this.measurementResultService.getByClientId(id).subscribe(res=>{
      this.lastMes = res.data[res.data.length-1]
      this.visceralFatLevel = res.data[res.data.length-1].visceralFatLevel+""
      this.targetVisceralFatLevel =res.data[res.data.length-1].targetVisceralFatLevel+""
      this.weight=res.data[res.data.length-1].weight+""
      this.targetWeight=res.data[res.data.length-1].targetWeight+""
      this.bodyFatWeight=res.data[res.data.length-1].bodyFatWeight+""
      this.mineral=res.data[res.data.length-1].mineral+""
      this.totalBodyWater=res.data[res.data.length-1].totalBodyWater+""
      this.protein =res.data[res.data.length-1].protein+""
      res.data.forEach(element => {
        console.log(element);
        
        
      this.WeightDataY.push(element.weight)
      this.bKIDataY.push(element.bki)
      this.bodyFatRatioDataY.push(element.bodyFatRatio)
      this.ikaDataY.push(element.ika)
       this.dateArrayX.push(element.measurementTime.toString())
       
      });

      console.log(this.dateArrayX);
      
      this.graph1 = {
        data: [
          { x:  this.dateArrayX, y:this.WeightDataY, type: 'scatter' }
          // ,{x:this.dateArrayX,y:[40,40]}
        ],
        layout: {title: 'Weight Data'}
      };
      this.graph2 = {
        data: [
          { x:  this.dateArrayX, y:this.ikaDataY, type: 'scatter' },
        ],
        layout: {title: 'IKA Data'}
      };
      this.graph3 = {
        data: [
          { x:  this.dateArrayX, y:this.bodyFatRatioDataY, type: 'scatter' },
        ],
        layout: {title: 'bodyFatRatio Data'}
      };
      this.graph4 = {
        data: [
          { x:  this.dateArrayX, y:this.bKIDataY, type: 'scatter' },
        ],
        layout: {title: 'BKI Data'}
      };
    })
  }
  pdfUrl: SafeResourceUrl;
  setPdfUrl(id:number){
    this.userService.getLatestPdf(id).subscribe(res=>{
      const fileUrl = URL.createObjectURL(res);
      setTimeout(() => {
        console.log(fileUrl);
      }, 100);
      
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
      console.log(fileUrl);
      console.log(this.pdfUrl);
    });
  }
  showDialog(){
    this.display=true;
  }
}
