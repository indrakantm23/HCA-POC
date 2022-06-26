import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(private toast: MatSnackBar) {}
  ngOnInit() {}

  showToast(message: string) {
    let x = document.getElementById("snackbar") as HTMLElement;
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 4000);
  }
}
