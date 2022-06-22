import { Component, OnInit } from "@angular/core";
import { MODIFY_DATA } from "../mocks";
import { ApiCallService } from "../../services/api-call.service";
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
    public commonApiService: CommonApiService
  ) {}
  selectedItems: any = new Set();
  data: any;
  pageData: any;

  ngOnInit(): void {
    this.getIdentities();
    this.pageData = this.apiCallService.dashboardPagefilter.getValue();
  }

  getIdentities() {
    const { pagNumber, recordsPerPage }: any =
      this.apiCallService.dashboardPagefilter.getValue();

    this.commonApiService
      .getIdeitities(pagNumber, recordsPerPage, BODY_DATA)
      .subscribe((res) => {
        const { data, pageNumber, recordsCount, recordsPerPage }: any = res;
        this.data = data;
      });
  }

  handleInputChange(searchKey: any) {
    console.log(searchKey);
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
