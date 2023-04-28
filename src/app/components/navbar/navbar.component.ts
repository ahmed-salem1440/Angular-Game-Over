import { AppComponent } from './../../app.component';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin:boolean= false;
 constructor(private _AuthenticationService:AuthenticationService, private _AppComponent:AppComponent){
  _AuthenticationService.userData.subscribe({
    next:()=>{
      if(_AuthenticationService.userData.getValue() !== null){
        this.isLogin = true
      }else{
        this.isLogin = false
      }
    }

  })
 }
 resize(){
  this._AppComponent.onResize()
 }
 logout(){
  this._AuthenticationService.logOut()
 }

}
