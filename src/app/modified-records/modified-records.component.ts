import { Component, OnInit } from "@angular/core";
import { MODIFY_DATA, MERGE_RECORDS } from "../shared/mocks";

@Component({
  selector: "app-modified-records",
  templateUrl: "./modified-records.component.html",
  styleUrls: ["./modified-records.component.scss"],
})
export class ModifiedRecordsComponent implements OnInit {
  constructor() {}
  public data: any = MODIFY_DATA;
  public selectedItems = new Set();

  ngOnInit(): void {
    console.log(MODIFY_DATA);
  }

  selectItem(event: any, item: any): void {
    const value: number | string = Number(event.target.value);
    if (this.selectedItems.has(value)) {
      this.selectedItems.delete(value);
    } else {
      this.selectedItems.add(value);
      MERGE_RECORDS.push(item);
    }
  }
}
