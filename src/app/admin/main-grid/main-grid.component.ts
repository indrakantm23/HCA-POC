import { Component, OnInit } from "@angular/core";
import { MODIFY_DATA } from "../../shared/mocks";
import { ApiCallService } from "../../services/api-call.service";
import { CommonApiService } from "../../services/common-api.service";
import { BODY_DATA } from "../../shared/constants";
import { SharedService } from "src/app/services/sharedService";

@Component({
  selector: "app-main-grid",
  templateUrl: "./main-grid.component.html",
  styleUrls: ["./main-grid.component.scss"],
})
export class MainGridComponent implements OnInit {
  constructor(
    public apiCallService: ApiCallService,
    public commonApiService: CommonApiService,
    public sharedService: SharedService
  ) {}
  selectedItems: any = new Set();
  data: any;
  pageData: any;
  totalRecords: number = 0;

  ngOnInit(): void {
    this.getIdentities(BODY_DATA);
  }

  getIdentities(body?: any) {
    const { pagNumber, recordsPerPage }: any =
      this.apiCallService.dashboardPagefilter.getValue();

    this.commonApiService
      .getIdeitities(pagNumber, recordsPerPage, body)
      .subscribe((res) => {
        const { data, pageNumber, recordsCount, recordsPerPage }: any = res;
        this.totalRecords = recordsCount;
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
    const value = Number(event.target.value);
    if (this.selectedItems.has(value)) {
      this.selectedItems.delete(value);
    } else {
      this.selectedItems.add(value);
    }
  }

  moveToModify(): void {
    let data = this.data;
    for (let i = 0; i < data.length; i++) {
      if (this.selectedItems.has(data[i].id)) {
        MODIFY_DATA.push(data[i]);
        data[i].hide = true;
      }
    }
    this.sharedService.showToast("Moved records to modify");
  }
}
