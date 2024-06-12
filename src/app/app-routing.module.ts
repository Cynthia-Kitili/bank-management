import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BanksComponent } from './components/banks/banks.component';
import { CustomersComponent } from './components/customers/customers.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', outlet: 'outlet1' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', outlet: 'outlet1' },

  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  { path: 'banks', component: BanksComponent,canActivate:[AuthGuard]},
  { path: 'customers', component: CustomersComponent,canActivate:[AuthGuard]},
  { path: 'users', component: UsersComponent,canActivate:[AuthGuard]},
  
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
