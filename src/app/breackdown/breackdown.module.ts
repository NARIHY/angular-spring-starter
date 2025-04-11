import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreackdownRoutingModule } from './breackdown-routing.module';
import { BreackdownComponent } from './breackdown/breackdown.component';


@NgModule({
  declarations: [
    BreackdownComponent
  ],
  imports: [
    CommonModule,
    BreackdownRoutingModule
  ]
})
export class BreackdownModule { }
