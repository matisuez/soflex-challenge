import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersModule } from './components/admin/orders/all-orders/all-orders.module';
import { FormOrdersModule } from './components/admin/orders/form-orders/form-orders.module';
import { HomeModule } from './components/common/home/home.module';
import { SigninModule } from './components/common/signin/signin.module';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  // Any routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Common routes
  { path: 'home', loadChildren: () => HomeModule, data: { showHeader: true }},
  { path: 'auth', loadChildren: () => SigninModule, data: { showHeader: true }},

  // Admin routes
  { path: 'admin/orders/all', canActivate: [AuthGuard], loadChildren: () => AllOrdersModule, data: { showAdminHeader: true }},
  { path: 'admin/orders/:id', canActivate: [AuthGuard], loadChildren: () => FormOrdersModule, data: { showAdminHeader: true }},

  // Wrong routes
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
