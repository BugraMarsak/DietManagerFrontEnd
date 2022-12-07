import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DietManagerFrontEnd';
  navClass:string = 'nav-open'
  mainClass:string ='main-close'


  constructor(private router:Router) {
    

  }
  
  hide = "";
  checker:boolean;

  changeHide(val: boolean){
    if(val){
      this.navClass = 'nav-open'
      this.mainClass = 'main-close'
      
    }
    else{
      this.navClass = 'nav-close'
      this.mainClass = 'main-open'  
    }

  }

  getRouter(){
    if(this.router.url == "/login" || this.router.url == "/register"){
      return true;

    }
    else 
    {
      return false
    }
    
  }



}
