import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ToastComponent } from './utils/toast/toast/toast.component';
import { LoaderComponent } from './utils/loader/loader.component';
import { RouterModule } from '@angular/router';
import { NgbToastModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ToastComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbToastModule,
    FontAwesomeModule,
    NgbAccordionModule
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    ToastComponent,
    LoaderComponent,
    NgbToastModule,
    FontAwesomeModule,
    NgbAccordionModule
  ]
})
export class CommonsModule { }
