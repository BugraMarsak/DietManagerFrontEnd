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
  constructor(
    private measurementResultService:MeasurementResultService,
    private activatedRoute:ActivatedRoute,
    ) { }

  ngOnInit(): void {
this.getClientId()

  }

  getClientId(){
    this.activatedRoute.params.subscribe(params =>{
      this.clientId = params["clientId"];
      this.x(params["clientId"]);
    })
  }
  title = 'dynamic-plots';
  // Bar Chart
  graph1:any
  graph2:any
  graph3:any
  graph4:any
  x(id:number){
    this.measurementResultService.getByClientId(id).subscribe(res=>{
      this.lastMes = res.data[res.data.length-1]
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
