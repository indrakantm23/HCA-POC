import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor() {}
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
