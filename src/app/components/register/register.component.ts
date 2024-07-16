import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { AuthenticationService } from './../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor( private _AuthenticationService:AuthenticationService , private _Router:Router){}
  isLoading:boolean = false
  apiError:string = ''
  registrationForm:FormGroup = new FormGroup({
    name:new FormControl(),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(002|\+2)?01[0125][0-9]{8}$/)]),
  });
  handleRegister(regForm:FormGroup):void{
    this.isLoading = true;
    this._AuthenticationService.register(regForm.value).subscribe({
      next:(response)=>{
        this.isLoading = false
        if(response.message === 'success'){
          this._Router.navigate(['/login'])
          this.apiError = ''
        }
      },
      error: (err)=>{
        this.isLoading = false
        this.apiError = err.error.message
      }
    })

  }
}
