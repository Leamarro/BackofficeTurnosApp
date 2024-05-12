import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDataComponent } from './component/create-data/create-data.component';
import { EditDataComponent } from './component/edit-data/edit-data.component';
import { ListDataComponent } from './component/list-data/list-data.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
