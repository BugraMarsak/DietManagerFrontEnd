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
    private measurementResultService:MeasurementResultService
    ) { }

  ngOnInit(): void {
this.x()

  }

  
  title = 'dynamic-plots';
  // Bar Chart
  graph1:any
  graph2:any
  graph3:any
  graph4:any
  x(){
    this.measurementResultService.getByClientId(1002).subscribe(res=>{
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
          { x:  this.dateArrayX, y:this.WeightDataY, type: 'scatter' },
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
