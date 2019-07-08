import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home2Component } from './home2/home2.component';
import { DetailsComponent } from './details/details.component';
import { UsbComponent } from './usb/usb.component';
import { GeneralDataComponent } from './general-data/general-data.component';  // <-Add here
import { NetSettingsComponent } from './net-settings/net-settings.component';
import { MessagesComponent } from './messages/messages.component';
import { KeyloggerComponent } from './keylogger/keylogger.component';
import { FiltersComponent } from './filters/filters.component';
import { NetworkComponent } from './network/network.component';
import { NetDataComponent } from './net-data/net-data.component';
import { LoginComponent } from './login/login.component';
import { ProcessesComponent } from './processes/processes.component';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home2',
    component: Home2Component
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'usb/:id',
    component: UsbComponent
  },
  {
    path: 'general-data/:id',
    component: GeneralDataComponent
  },
  {
    path: 'net-settings/:id',
    component: NetSettingsComponent
  },
  {
    path: 'keylogger/:id',
    component: KeyloggerComponent
  },
  {
    path: 'messages/:id',
    component: MessagesComponent
  },
  {
    path: 'filters/:id',
    component: FiltersComponent
  },
  {
    path: 'network/:id',
    component: NetworkComponent
  },
  {
    path: 'net-data/:id',
    component: NetDataComponent
  },
  {
    path: 'processes/:id',
    component: ProcessesComponent
  },
  {
    path: 'security/:id',
    component: SecurityComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
