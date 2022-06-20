import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ApiCallService {
  dashboardPagefilter: BehaviorSubject<Object> = new BehaviorSubject<Object>({
    pagNumber: 0,
    recordsPerPage: 20,
  });
  constructor(public http: HttpClient) {}
}
