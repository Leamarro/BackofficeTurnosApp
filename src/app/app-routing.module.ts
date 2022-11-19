import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDataComponent } from './component/create-data/create-data.component';
import { EditDataComponent } from './component/edit-data/edit-data.component';
import { ListDataComponent } from './component/list-data/list-data.component';

const routes: Routes = [
  {
    path: 'create-data',
    component: CreateDataComponent,
  },
  {
    path: 'list-data',
    component: ListDataComponent,
  },
  {
    path: 'edit-data/:id',
    component: EditDataComponent,
  },
  { path: '', redirectTo: '/create-data', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
