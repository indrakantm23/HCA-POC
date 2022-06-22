import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filter-header",
  templateUrl: "./filter-header.component.html",
  styleUrls: ["./filter-header.component.scss"],
})
export class FilterHeaderComponent implements OnInit {
  constructor() {}
  @Output() handleInputChange = new EventEmitter<any>();

  ngOnInit(): void {}

  handleChange(event: any): void {
    const value = event.target.value;
    this.handleInputChange.emit(value);
  }
}
