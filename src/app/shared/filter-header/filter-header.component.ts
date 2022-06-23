import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filter-header",
  templateUrl: "./filter-header.component.html",
  styleUrls: ["./filter-header.component.scss"],
})
export class FilterHeaderComponent implements OnInit {
  constructor() {}
  public filter: string = "";
  @Output() handleInputChange = new EventEmitter<any>();

  ngOnInit(): void {}

  handleChange(event: any): void {
    const value = event.target.value;
    this.handleInputChange.emit({ value, filter: this.filter });
  }
  changeFilter(event: any) {
    this.filter = event.target.value;
  }
}
