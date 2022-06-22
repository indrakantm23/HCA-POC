import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
// import { NgxPermissionsService } from "ngx-permissions";

export interface Roles {
  id: number;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router
  ) // private permissionsService: NgxPermissionsService
  {}
  sendToken(
    firstName: string,
    lastName: string,
    token: string,
    roles: Roles[]
  ) {
    localStorage.setItem("LoggedInUser", `${firstName} ${lastName}`);
    localStorage.setItem("token", token);
    localStorage.setItem("hcaRole", roles[0].name);
  }
  getToken() {
    return localStorage.getItem("LoggedInUser");
  }
  getRole() {
    return localStorage.getItem("hcaRole");
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("token");
    localStorage.removeItem("hcaRole");
    this.router.navigate(["login"]);
  }
}
