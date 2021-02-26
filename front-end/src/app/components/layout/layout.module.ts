import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [CommonHeaderComponent, AdminHeaderComponent, ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CommonHeaderComponent, AdminHeaderComponent]
})
export class LayoutModule { }
