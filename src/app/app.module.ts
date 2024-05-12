import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDataComponent } from './component/list-data/list-data.component';
import { CreateDataComponent } from './component/create-data/create-data.component';
import { EditDataComponent } from './component/edit-data/edit-data.component';
import { NavbarModule } from './component/navbar/navbar.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-data', component: CreateDataComponent },
  { path: 'list-data', component: ListDataComponent },
  { path: 'edit-data/:id', component: EditDataComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent, ListDataComponent, HomeComponent, CreateDataComponent, EditDataComponent, LoginComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    NgApexchartsModule,
    NavbarModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
