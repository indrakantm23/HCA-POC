import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainGridComponent } from './shared/main-grid/main-grid.component';
import { ModifiedRecordsComponent } from './modified-records/modified-records.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'Login Page'
    }
  },
  { path: "login", component: LoginComponent},
  { path: "user-grid", component: MainGridComponent},
  { path: "modify-records", component: ModifiedRecordsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
