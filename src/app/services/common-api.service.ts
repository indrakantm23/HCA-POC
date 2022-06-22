import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { AppSettingsService } from "./app.settings.service";

@Injectable({
  providedIn: "root",
})
export class CommonApiService implements OnInit {
  public loginURL;
  public IdentitiesURL;
  public linkURL;
  public unlinkURL;
  public mergeURL;
  public unmergeURL;
  public deleteURL;

  constructor(public http: HttpClient, public appSettings: AppSettingsService) {
    //********************** LOGIN STARTS *************************
    this.loginURL =
      appSettings.consultantApiBaseUrl + appSettings.ext.CoreData.auth.Login;
    //********************** LOGIN STARTS *************************

    //********************** IDENTITY STARTS *************************
    this.IdentitiesURL =
      appSettings.consultantApiBaseUrl +
      appSettings.ext.CoreData.Identities.Identities;
    this.linkURL =
      appSettings.consultantApiBaseUrl +
      appSettings.ext.CoreData.Identities.link;
    this.unlinkURL =
      appSettings.consultantApiBaseUrl +
      appSettings.ext.CoreData.Identities.unlink;
    this.mergeURL =
      appSettings.consultantApiBaseUrl +
      appSettings.ext.CoreData.Identities.merge;
    this.unmergeURL =
      appSettings.consultantApiBaseUrl +
      appSettings.ext.CoreData.Identities.unmerge;
    this.deleteURL =
      appSettings.consultantApiBaseUrl +
      appSettings.ext.CoreData.Identities.delete;
    // ********************** IDENTITY ENDS ***************************
  }

  ngOnInit() {}
  static HttpOptions() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
      }),
    };
  }

  // *************** POST API *********************//
  login(data: any) {
    const cUrl = this.loginURL;
    return this.http.post(cUrl, data);
  }
  getIdeitities(pagNumber: number, recordsPerPage: number, data: any) {
    const cUrl = `${this.IdentitiesURL}?pagNumber=${pagNumber}&recordsPerPage=${recordsPerPage}`;
    return this.http.post(cUrl, data);
  }

  // *************** GET API *********************//

  // *************** UPDATE API *********************//
  link(data: any) {
    const cUrl = `${this.linkURL}`;
    return this.http.put(cUrl, data);
  }
  unlink(data: any) {
    const cUrl = `${this.unlinkURL}`;
    return this.http.put(cUrl, data);
  }
  merge(data: any) {
    const cUrl = `${this.mergeURL}`;
    return this.http.put(cUrl, data);
  }
  unmerge(data: any) {
    const cUrl = `${this.unmergeURL}`;
    return this.http.put(cUrl, data);
  }

  // *************** DELETE API *********************//
  delete(data: any) {
    const cUrl = `${this.deleteURL}`;
    return this.http.delete(cUrl, data);
  }
}
