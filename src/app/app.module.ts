import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { UsbComponent } from './usb/usb.component';
import { Home2Component } from './home2/home2.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { NetSettingsComponent } from './net-settings/net-settings.component';  // <-Add here
import { NgxPaginationModule} from 'ngx-pagination';
import { MessagesComponent } from './messages/messages.component';
import { KeyloggerComponent } from './keylogger/keylogger.component';
import { FiltersComponent } from './filters/filters.component';
import { NetworkComponent } from './network/network.component';
import { NetDataComponent } from './net-data/net-data.component';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ProcessesComponent } from './processes/processes.component';
import { SecurityComponent } from './security/security.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home2', component: Home2Component, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    UsbComponent,
    Home2Component,
    GeneralDataComponent,
    NetSettingsComponent,
    MessagesComponent,
    KeyloggerComponent,
    FiltersComponent,
    NetworkComponent,
    NetDataComponent,
    LoginComponent,
    ProcessesComponent,
    SecurityComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // <-Add here
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
