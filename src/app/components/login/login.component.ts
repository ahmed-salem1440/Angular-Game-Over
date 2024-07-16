import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}
  isLoading: boolean = false;
  apiError: string = '';
  forgetPassword() {
    alert(
      'Please create a new acount, just press "ok" and you will redirect to register form'
    );
    this._Router.navigate(['/register']);
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,10}/),
    ]),
  });
  handleLogin(loginForm: FormGroup): void {
    this.isLoading = true;
    this._AuthenticationService.login(loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.message === 'success') {
          localStorage.setItem('userToken', response.token);
          this._AuthenticationService.decodeUserData();
          console.log(response);
          this._Router.navigate(['/home']);
          this.apiError = '';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.apiError = err.error.message;
      },
    });
  }
}
