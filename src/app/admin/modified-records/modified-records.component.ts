import { Component, OnInit } from "@angular/core";
import { MODIFY_DATA, MERGE_RECORDS } from "../../shared/mocks";
import { CommonApiService } from "../../services/common-api.service";
import { SharedService } from "../../services/sharedService";

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
    const value = Number(event.target.value);
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
    const data = this.data.filter((el: any) => this.selectedItems.has(el.id));
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
      this.data = this.data.filter((el: any) => !this.selectedItems.has(el.id));
      MODIFY_DATA.splice(0);
      MODIFY_DATA.push(...data);
    });
  }

  unlink() {
    const data = this.data.filter((el: any) => this.selectedItems.has(el.id));
    const bodyData = {
      unlinkFromSource: {
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
      this.data = this.data.filter((el: any) => !this.selectedItems.has(el.id));
      MODIFY_DATA.splice(0);
      MODIFY_DATA.push(...data);
    });
  }

  merge() {
    const data = this.data.filter((el: any) => this.selectedItems.has(el.id));
    const bodyData = {
      toSurviveSource: {
        name: data[0].sourceName,
        id: data[0].sourceSystemId,
      },
      toRetireSource: {
        name: data[1].sourceName,
        id: data[1].sourceSystemId,
      },
    };
    this.commonApiService.merge(bodyData).subscribe((res) => {
      this.sharedService.showToast("Merged records successfully.");
      this.data = this.data.filter((el: any) => !this.selectedItems.has(el.id));
      MODIFY_DATA.splice(0);
      MODIFY_DATA.push(...data);
    });
  }

  unmerge() {
    const data = this.data.filter((el: any) => this.selectedItems.has(el.id));
    const bodyData = {
      unmergeFromSource: {
        name: data[0].sourceName,
        id: data[0].sourceSystemId,
      },
      unmergeSource: {
        name: data[1].sourceName,
        id: data[1].sourceSystemId,
      },
    };
    this.commonApiService.unmerge(bodyData).subscribe((res) => {
      this.sharedService.showToast("Unmerged records successfully.");
      this.data = this.data.filter((el: any) => !this.selectedItems.has(el.id));
      MODIFY_DATA.splice(0);
      MODIFY_DATA.push(...data);
    });
  }
}
