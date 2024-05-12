import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateDataComponent } from './create-data.component';

@NgModule({
  declarations: [CreateDataComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule
  ],
  exports: [CreateDataComponent]
})
export class CreateDataModule { }
