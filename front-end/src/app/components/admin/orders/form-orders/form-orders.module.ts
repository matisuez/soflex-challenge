import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormOrdersRoutingModule } from './form-orders-routing.module';
import { FormOrdersComponent } from './form-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FormOrdersComponent],
  imports: [
    CommonModule,
    FormOrdersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormOrdersModule { }
