import { TokenClaim } from './../../services/tokenclaim.service';
import { Router } from '@angular/router';
import { ClientAlergiesService } from './../../services/client-alergies.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MenuItem, PrimeIcons} from 'primeng/api';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
showFiller = false;
  constructor(private test:ClientAlergiesService,private router:Router,private tokenClaim:TokenClaim) { }
  idName:string = "nav-open";
  ngOnInit(): void {
    // this.test.getByClientId(25).subscribe(res=>{
    //   console.log(res);
      
    // })
  }

  getRole(){
    return this.tokenClaim.getclaims();
  }

  @Output() onHide = new EventEmitter<boolean>();
  setHide(){
     this.onHide.emit();
  }


  changSideStatus(){
    this.idName =this.idName =="nav-open"?"nav-close":"nav-open"
    console.log(this.idName);  
    console.log(this.idName =="nav-open"?true:false);
     
    this.onHide.emit(this.idName =="nav-open"?true:false);
  }

  check(){
    var x = localStorage.getItem("token")
    if(x ==null){
      return false
    }
    else{
      return true
    }
  }
  logout(){
    console.log(123);
    
    localStorage.removeItem("token")
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }

  
}
