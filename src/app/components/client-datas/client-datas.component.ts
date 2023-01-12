import { TokenClaim } from './../../services/tokenclaim.service';
import { MeasurementResultService } from './../../services/measurement-result.service';
import { Component, OnInit } from '@angular/core';


import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  selector: 'app-client-datas',
  templateUrl: './client-datas.component.html',
  styleUrls: ['./client-datas.component.scss']
})
export class ClientDatasComponent implements OnInit {
  WeightDataY:number[] = []
  bKIDataY:number[]=[]
  dateArrayX:string[] = []
  bodyFatRatioDataY:number[]=[]
  ikaDataY:number[]=[]
  constructor(
    private measurementResultService:MeasurementResultService,
    private tokenClaim:TokenClaim
    ) { }

  ngOnInit(): void {
    this.x(this.tokenClaim.getid())
  }

  
  title = 'dynamic-plots';
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


}
