import { Token } from './../model/token';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenClaim {
 
  constructor() { }

  decode(){
    if(!localStorage.getItem("token")){
       return ''
    }
    
    var token:string = localStorage.getItem("token")
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
  }

  getid(){
    var token = this.decode()   
    if(token==''){
      return "0"
    }
    return token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }
  
  getclaims(){
    var token = this.decode();
    if(token==''){
      return " "
    }
    return token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  getName(){
    var token = this.decode();
    if(token==''){
      return " "
    }
    return token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

}
