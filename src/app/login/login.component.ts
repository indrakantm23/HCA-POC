import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginCreds, ErrorTypes } from '../shared/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private form: FormBuilder, 
    private router: Router
  ) { }
  public loginForm!: FormGroup;
  private errorType: string = '';

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void{
    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void{
    if(this.loginForm.valid){
      const data = this.loginForm.value;
      const {username, password}: any = data;
      if(loginCreds.USERNAME.has(username) && loginCreds.PASSWORD === password){
        // LOGIN SUCCESSFULL
        console.log('LOGIN SUCCESSFULL')
       this.router.navigate(['/user-grid'])
      }else{
        // INVALID CREDENTIALS
        this.errorType = ErrorTypes.INVALID;
        console.log('INVALID CREDENTIALS')
      }
    }else{
      // PLEASE ENTER USERNAME & PASSWORD
      this.errorType = ErrorTypes.REQUIRED;
      console.log('PLEASE ENTER USERNAME & PASSWORD')
    }
  }

  getError(field: any): any {
    const Errors: any = {
      INVALID: {
          username: 'Please enter valid username',
          password: 'Please enter valid password'
      },
      REQUIRED: {
          username: 'Username is required',
          password: 'Password is required'
      }
  }
      return Errors[this.errorType][field];
  }

  isInvalid(field: string): boolean {
    return !this.loginForm.controls[field].valid && !!this.errorType;
  }

}
