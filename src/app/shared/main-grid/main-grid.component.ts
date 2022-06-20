import { Component, OnInit } from "@angular/core";
import { MOCK_DATA, MODIFY_DATA } from "../mocks";
import { ApiCallService } from "../../services/api-call.service";
import { CommonApiService } from "../../services/common-api.service";

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
  data: any = MOCK_DATA;
  pageData: any;

  ngOnInit(): void {
    this.getIdentities();
    this.pageData = this.apiCallService.dashboardPagefilter.getValue();
  }

  getIdentities() {
    const { pagNumber, recordsPerPage }: any =
      this.apiCallService.dashboardPagefilter.getValue();
    const data = {
      sources: [
        {
          name: "",
          id: "",
        },
      ],
      emails: [""],
      addresses: [
        {
          line1: "",
          line2: "",
          city: "",
          state: "",
          postalCode: "",
        },
      ],
      names: [
        {
          first: "",
          middle: "",
          last: "",
          suffix: "",
        },
      ],
      ssns: [""],
      genders: [""],
      dateOfBirths: [""],
      phoneNumbers: [
        {
          number: "",
          areaCode: "",
          extension: "",
          countryCode: "",
        },
      ],
    };
    this.commonApiService
      .getIdeitities(pagNumber, recordsPerPage, data)
      .subscribe((res) => {
        console.log(res);
      });
  }

  selectItem(event: any): void {
    const value: number | string = Number(event.target.value);
    if (this.selectedItems.has(value)) {
      this.selectedItems.delete(value);
    } else {
      this.selectedItems.add(value);
    }
  }

  moveToModify(): void {
    for (let i = 0; i < MOCK_DATA.length; i++) {
      if (this.selectedItems.has(MOCK_DATA[i].linkId)) {
        MODIFY_DATA.push(...MOCK_DATA.splice(i, 1));
      }
    }
  }
}
