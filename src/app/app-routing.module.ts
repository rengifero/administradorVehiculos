
import { SettingsComponent } from './components/settings/settings.component';
import { AutosComponent } from './components/autos/autos.component';
import { AddEventsAutoComponent } from './components/add-events-auto/add-events-auto.component';
import { AutosAdminComponent } from './components/autos-admin/autos-admin.component';
import { AutosListComponent } from './components/autos-list/autos-list.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { AuthGuard } from "./auth.guard";
import { DatallesComponent } from './components/datalles/datalles.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verification', component: VerifyEmailComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'autos-list', component: AutosListComponent },
  { path: 'autos-admin/:autoId/:admin/:iglesia/:marca', component: AutosAdminComponent },
  { path: 'add-auto/:autoId/:admin', component: AddEventsAutoComponent },
  { path: 'autos/:autoId/:admin', component: AutosComponent },
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'detalles/:auto-detalle', component: DatallesComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

