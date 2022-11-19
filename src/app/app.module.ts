import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListDataComponent } from './component/list-data/list-data.component';
import { CreateDataComponent } from './component/create-data/create-data.component';
import { EditDataComponent } from './component/edit-data/edit-data.component';

@NgModule({
  declarations: [AppComponent, ListDataComponent, CreateDataComponent, EditDataComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
