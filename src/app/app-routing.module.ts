import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainGridComponent } from "./admin/main-grid/main-grid.component";
import { AuthGuard } from "./services/auth.guard";
import { NgxPermissionsGuard } from "ngx-permissions";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      breadcrumb: "Login Page",
    },
  },
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: AppComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: "Dashboard",
    },
    children: [
      {
        path: "admin",
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["Admin"],
            redirectTo: "/login",
          },
        },
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
      {
        path: "user",
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["User"],
            redirectTo: "/login",
          },
        },
        loadChildren: () => import("./app.module").then((m) => m.AppModule),
      },
      {
        path: "consultant",
        canActivateChild: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ["Consultant"],
            redirectTo: "/login",
          },
        },
        children: [
          {
            path: "",
            redirectTo: "dashboard",
            pathMatch: "full",
          },
          {
            path: "dashboard",
            component: MainGridComponent,
            data: {
              breadcrumb: "Dashboard",
            },
          },
        ],
      },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
