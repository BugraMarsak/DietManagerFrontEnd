import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModule } from '../model/LoginModule';
import { RegisterModule } from '../model/registerModule';
import { SingleResponseModel } from '../model/singleResponseModel';
import { TokenModel } from '../model/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:7240/api/';

  constructor(private httpClient:HttpClient) { }

  login(loginModule:LoginModule){
    console.log(this.apiUrl+"user/login",loginModule);
    
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/login",loginModule)
  }

  register(registerModule:RegisterModule){    
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/register",registerModule)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

}
