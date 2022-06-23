import { Component, OnInit } from "@angular/core";
import { MODIFY_DATA, MERGE_RECORDS } from "../shared/mocks";
import { CommonApiService } from "../services/common-api.service";
import { SharedService } from "../services/sharedService";

@Component({
  selector: "app-modified-records",
  templateUrl: "./modified-records.component.html",
  styleUrls: ["./modified-records.component.scss"],
})
export class ModifiedRecordsComponent implements OnInit {
  constructor(
    public commonApiService: CommonApiService,
    public sharedService: SharedService
  ) {}
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
        name: data[0].sourceName,
        id: data[0].sourceSystemId,
      },
      source: {
        name: data[1].sourceName,
        id: data[1].sourceSystemId,
      },
    };
    this.commonApiService.link(bodyData).subscribe((res) => {
      this.sharedService.showToast("Linked records successfully.");
      this.data = this.data.filter(
        (el: any) => !this.selectedItems.has(el.mpiLinkId)
      );
    });
  }

  unlink() {
    const data = this.data.filter((el: any) =>
      this.selectedItems.has(el.mpiLinkId)
    );
    const bodyData = {
      linkToSource: {
        name: data[0].sourceName,
        id: data[0].sourceSystemId,
      },
      source: {
        name: data[1].sourceName,
        id: data[1].sourceSystemId,
      },
    };
    this.commonApiService.unlink(bodyData).subscribe((res) => {
      this.sharedService.showToast("Unlinked records successfully.");
    });
  }

  merge() {
    const data = this.data.filter((el: any) =>
      this.selectedItems.has(el.mpiLinkId)
    );
    const bodyData = {
      linkToSource: {
        name: data[0].sourceName,
        id: data[0].sourceSystemId,
      },
      source: {
        name: data[1].sourceName,
        id: data[1].sourceSystemId,
      },
    };
    this.commonApiService.merge(bodyData).subscribe((res) => {
      this.sharedService.showToast("Merged records successfully.");
    });
  }

  unmerge() {
    const data = this.data.filter((el: any) =>
      this.selectedItems.has(el.mpiLinkId)
    );
    const bodyData = {
      linkToSource: {
        name: data[0].sourceName,
        id: data[0].sourceSystemId,
      },
      source: {
        name: data[1].sourceName,
        id: data[1].sourceSystemId,
      },
    };
    this.commonApiService.unmerge(bodyData).subscribe((res) => {
      this.sharedService.showToast("Unmerged records successfully.");
    });
  }
}
