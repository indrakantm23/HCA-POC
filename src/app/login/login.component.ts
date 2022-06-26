import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { loginCreds, ErrorTypes } from "../shared/constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CommonApiService } from "../services/common-api.service";
import { AuthService } from "../services/auth.service";
import { SharedService } from "../services/sharedService";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private commonApiService: CommonApiService,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar
  ) {}
  public loginForm!: FormGroup;
  private errorType: string = "";

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.form.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.commonApiService.login(data).subscribe(
        (res) => {
          const {
            expiration,
            firstName,
            lastName,
            middleName,
            roles,
            token,
          }: any = res;
          if (token) {
            this.authService.sendToken(firstName, lastName, token, roles);
            this.router.navigate(["/user-grid"]);
            this.sharedService.showToast("Logged in successfully");
          }
        },
        (err) => {
          const { error }: any = err;
          if (error) {
            this.sharedService.showToast(error);
          }
        }
      );
      // const {username, password}: any = data;
      //   if(loginCreds.USERNAME.has(username) && loginCreds.PASSWORD === password){
      //     // LOGIN SUCCESSFULL
      //     console.log('LOGIN SUCCESSFULL')
      //    this.router.navigate(['/user-grid'])
      //   }else{
      //     // INVALID CREDENTIALS
      //     this.errorType = ErrorTypes.INVALID;
      //     console.log('INVALID CREDENTIALS')
      //   }
      // }else{
      //   // PLEASE ENTER USERNAME & PASSWORD
      //   this.errorType = ErrorTypes.REQUIRED;
      //   console.log('PLEASE ENTER USERNAME & PASSWORD')
      // }
    } else {
      this.sharedService.showToast("Please enter username and password");
    }
  }

  getError(field: any): any {
    const Errors: any = {
      INVALID: {
        username: "Please enter valid username",
        password: "Please enter valid password",
      },
      REQUIRED: {
        username: "Username is required",
        password: "Password is required",
      },
    };
    return Errors[this.errorType][field];
  }

  isInvalid(field: string): boolean {
    if (!field || !this.loginForm.controls[field]) return false;
    return !this.loginForm.controls[field].valid && !!this.errorType;
  }
}
