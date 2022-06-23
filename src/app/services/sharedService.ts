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
    this.toast.open(message, "GOT IT", {
      duration: 4000,
    });
  }
}
