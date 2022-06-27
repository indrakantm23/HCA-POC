import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./shared/header/header.component";
import { LeftNavComponent } from "./shared/left-nav/left-nav.component";
import { FilterHeaderComponent } from "./shared/filter-header/filter-header.component";
import { MainGridComponent } from "./admin/main-grid/main-grid.component";
import { LoginComponent } from "./login/login.component";
import { MaterialModule } from "./shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModifiedRecordsComponent } from "./admin/modified-records/modified-records.component";
("@angular/platform-browser/animations");
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftNavComponent,
    FilterHeaderComponent,
    MainGridComponent,
    LoginComponent,
    ModifiedRecordsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
