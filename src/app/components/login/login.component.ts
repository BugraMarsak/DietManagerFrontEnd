import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) { } //,private toastrservice:ToastrService

  ngOnInit(): void {
    
    this.createLoginForm();
  }


  createLoginForm(){
    this.loginForm= this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })

  }

  login(){
    
      if(this.loginForm.valid){
        
        let loginModel = Object.assign({},this.loginForm.value)
        this.authService.login(loginModel).subscribe(response=>{
        // this.toastrservice.info("Logged in")
        console.log(232);
        
        localStorage.setItem("token",response.data.token)
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);

        },responseError=>{
          // this.toastrservice.error("failed")
        })
      }
  }

}
