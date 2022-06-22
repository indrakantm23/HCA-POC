import { Component, OnInit } from "@angular/core";
import { MODIFY_DATA, MERGE_RECORDS } from "../shared/mocks";
import { CommonApiService } from "../services/common-api.service";

@Component({
  selector: "app-modified-records",
  templateUrl: "./modified-records.component.html",
  styleUrls: ["./modified-records.component.scss"],
})
export class ModifiedRecordsComponent implements OnInit {
  constructor(public commonApiService: CommonApiService) {}
  public data: any = MODIFY_DATA;
  public selectedItems = new Set();

  ngOnInit(): void {}

  selectItem(event: any, item: any): void {
    const value = event.target.value;
    if (this.selectedItems.size === 2) {
      return;
    } else {
      if (this.selectedItems.has(value)) {
        this.selectedItems.delete(value);
      } else {
        this.selectedItems.add(value);
        MERGE_RECORDS.push(item);
      }
    }
  }

  link() {
    const data = this.data.filter((el: any) =>
      this.selectedItems.has(el.mpiLinkId)
    );
    const bodyData = {
      linkToSource: {
        name: data[0].firstName,
        id: data[0].mpiLinkId,
      },
      source: {
        name: data[1].firstName,
        id: data[1].mpiLinkId,
      },
    };
    this.commonApiService.link(bodyData).subscribe((res) => {
      console.log(res);
    });
  }

  unlink() {
    const data = this.data.filter((el: any) =>
      this.selectedItems.has(el.mpiLinkId)
    );
    const bodyData = {
      linkToSource: {
        name: data[0].firstName,
        id: data[0].mpiLinkId,
      },
      source: {
        name: data[1].firstName,
        id: data[1].mpiLinkId,
      },
    };
    this.commonApiService.unlink(bodyData).subscribe((res) => {
      console.log(res);
    });
  }

  merge() {
    const data = this.data.filter((el: any) =>
      this.selectedItems.has(el.mpiLinkId)
    );
    const bodyData = {
      linkToSource: {
        name: data[0].firstName,
        id: data[0].mpiLinkId,
      },
      source: {
        name: data[1].firstName,
        id: data[1].mpiLinkId,
      },
    };
    this.commonApiService.merge(bodyData).subscribe((res) => {
      console.log(res);
    });
  }

  unmerge() {
    const data = this.data.filter((el: any) =>
      this.selectedItems.has(el.mpiLinkId)
    );
    const bodyData = {
      linkToSource: {
        name: data[0].firstName,
        id: data[0].mpiLinkId,
      },
      source: {
        name: data[1].firstName,
        id: data[1].mpiLinkId,
      },
    };
    this.commonApiService.unmerge(bodyData).subscribe((res) => {
      console.log(res);
    });
  }
}
