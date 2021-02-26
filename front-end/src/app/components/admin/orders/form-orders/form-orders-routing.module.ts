import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormOrdersComponent } from './form-orders.component';

const routes: Routes = [
  { path: '', component: FormOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormOrdersRoutingModule { }
