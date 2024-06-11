import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BanksComponent } from './components/banks/banks.component';
import { CustomersComponent } from './components/customers/customers.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', outlet: 'outlet1' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', outlet: 'outlet1' },

  { path: 'dashboard', component: DashboardComponent},
  { path: 'banks', component: BanksComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'users', component: UsersComponent},
  
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
