import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { CommonsModule } from '../commons/commons.module';


@NgModule({
  declarations: [
    DashboardClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CommonsModule
  ]
})
export class ClientModule { }
