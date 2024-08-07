import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient,private _Router:Router) {

    if(localStorage.getItem('userToken')){
      this.decodeUserData()
    }
  }
  register(userData:object):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
  }
  login(userData:object):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userData)
  }
  decodeUserData(){
    let encodedToken = JSON.stringify( localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken)
    console.log(decodedToken);
    this.userData.next(decodedToken)
  }

  logOut(){
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this._Router.navigate(['/login'])
  }
}
