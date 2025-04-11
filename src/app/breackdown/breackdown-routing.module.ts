import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreackdownComponent } from './breackdown/breackdown.component';

const routes: Routes = [
  {path: '', component: BreackdownComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreackdownRoutingModule { }
