import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../navbar/navbar.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NavbarModule,
    AppRoutingModule,
  ]
})
export class HomeModule { }
