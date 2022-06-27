import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/material/material.module";
import { MainGridComponent } from "./main-grid/main-grid.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "user-grid",
    pathMatch: "full",
  },
  {
    path: "user-grid",
    component: MainGridComponent,
    data: {
      breadcrumb: "User Intities",
    },
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [RouterModule],
  entryComponents: [],
})
export class AdminModule {}
