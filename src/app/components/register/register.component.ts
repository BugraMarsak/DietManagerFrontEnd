import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService) { }//,private toastrservice:ToastrService

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm= this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      phoneNumber:["",Validators.required],
      address:["",Validators.required],
      photo:["https://user-images.githubusercontent.com/47815793/132744117-68c16f98-09e6-4fa6-b4fc-5e789e222a15.png",Validators.required],
    })
  }

  register(){
    let registerModel = Object.assign({},this.registerForm.value) 
    this.authService.register(registerModel).subscribe(response=>{
      // this.toastrservice.info("Hesap oluşturuldu.")
      localStorage.setItem("token",response.data.token)
      console.log(response);
      
    },responseError=>{
      // this.toastrservice.error(responseError.error)
      console.log(responseError);
    })
  }

}
