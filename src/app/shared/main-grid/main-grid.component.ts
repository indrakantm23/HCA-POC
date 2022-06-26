import { Component, OnInit } from "@angular/core";
import { MODIFY_DATA } from "../mocks";
import { ApiCallService } from "../../services/api-call.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonApiService } from "../../services/common-api.service";
import { BODY_DATA } from "../../shared/constants";

@Component({
  selector: "app-main-grid",
  templateUrl: "./main-grid.component.html",
  styleUrls: ["./main-grid.component.scss"],
})
export class MainGridComponent implements OnInit {
  constructor(
    public apiCallService: ApiCallService,
    public commonApiService: CommonApiService,
    private _snackBar: MatSnackBar
  ) {}
  selectedItems: any = new Set();
  data: any;
  pageData: any;

  ngOnInit(): void {
    this.getIdentities(BODY_DATA);
    this.pageData = this.apiCallService.dashboardPagefilter.getValue();
    this._snackBar.open("message", "action", {
      duration: 400000,
    });
  }

  getIdentities(body?: any) {
    const { pagNumber, recordsPerPage }: any =
      this.apiCallService.dashboardPagefilter.getValue();

    this.commonApiService
      .getIdeitities(pagNumber, recordsPerPage, body)
      .subscribe((res) => {
        const { data, pageNumber, recordsCount, recordsPerPage }: any = res;
        this.data = data;
      });
  }

  handleInputChange(search: any) {
    const searchQuery: any = BODY_DATA;
    if (search.filter) {
      if (search.filter === "first") {
        console.log("name");
        searchQuery["names"][0][search.filter] = search.value;
      } else {
        console.log("in");
        searchQuery[search.filter] = [search.value];
      }
    }
    console.log(searchQuery);
    this.getIdentities(searchQuery);
  }

  selectItem(event: any): void {
    const value = event.target.value;
    if (this.selectedItems.has(value)) {
      this.selectedItems.delete(value);
    } else {
      this.selectedItems.add(value);
    }
  }

  moveToModify(): void {
    let data = this.data;
    for (let i = 0; i < data.length; i++) {
      if (this.selectedItems.has(data[i].mpiLinkId)) {
        MODIFY_DATA.push(data[i]);
        data[i].hide = true;
      }
    }
  }
}
