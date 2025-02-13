import { SettingsService } from './shared/settings-service.service';
import { AutosListComponent } from './components/autos-list/autos-list.component';
import { AuthenticationServiceService } from './shared/authentication-service.service';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { NgAuthService } from "./ng-auth.service";
import { HttpClientModule } from '@angular/common/http';


import { FlexLayoutModule } from "@angular/flex-layout";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MomentDateAdapter } from "@angular/material-moment-adapter";



import { ModalComponent } from './components/modal/modal.component';

import { AdminComponent } from './components/admin/admin.component';
import { AutosAdminComponent } from './components/autos-admin/autos-admin.component';
import { AddEventsAutoComponent } from './components/add-events-auto/add-events-auto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AutosComponent } from './components/autos/autos.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DatallesComponent } from './components/datalles/datalles.component';
import { EditAutosComponent } from './edit-autos/edit-autos.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ModalComponent,
    LoginComponent,
    AdminComponent,
    AutosListComponent,
    AutosAdminComponent,
    AddEventsAutoComponent,
    NavbarComponent,
    SidebarComponent,
    AutosComponent,
    SettingsComponent,
    DatallesComponent,
    EditAutosComponent,
    
    
  
    
  ],
  imports: [
   
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebae),
    AngularFireAuthModule,
    AngularFirestoreModule, 
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatToolbarModule,
    ToastrModule.forRoot(),
   
    HttpClientModule
  
     
  ],
  providers: [NgAuthService,MatDatepickerModule,AuthenticationServiceService,SettingsService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  
  entryComponents: [ModalComponent,DashboardComponent],
  
})
export class AppModule { }
