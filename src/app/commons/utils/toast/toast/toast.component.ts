import { Component, HostBinding } from '@angular/core';
import { ToastService } from '../toast.service';
import { Toast } from '../toast.service';  // Make sure to import Toast interface if you want type checking

@Component({
  selector: 'app-toast',
  template: `
    <ng-container>
      <!-- Loop through each toast in the toastService.toasts array -->
      <ngb-toast
        *ngFor="let toast of toastService.toasts"
        [class]="toast.classname"
        [autohide]="!toast.toast.persist"
        [delay]="toastDuration">
        <div>
          <ng-template ngbToastHeader>
            <div class="me-auto">
              <!-- Display icon -->
              <fa-icon [icon]="toast.toast.icon" [class]="'me-2'"></fa-icon>
              <!-- Display date if available -->
              <div class="mx-2" *ngIf="toast.toast.date">{{ toast.toast.date }}</div>
              <strong class="mx-2">{{ toast.toast.title }}</strong>
            </div>
          </ng-template>
          <!-- Display the text body of the toast -->
          <div class="toast-body row">
            <p class="mx-2">{{ toast.toast.text }}</p>
          </div>
        </div>
      </ngb-toast>
    </ng-container>
  `,
})
export class ToastComponent {
  @HostBinding('class.ngb-toasts') expanded = true;
  @HostBinding('class') classes = 'toast-container position-fixed top-0 end-0 p-3';
  @HostBinding('style') style = 'z-index: 1200';
  toastDuration: number;

  constructor(public toastService: ToastService) {
    // Set the default toast duration to 5000ms (5 seconds)
    this.toastDuration = 5000;
  }
}
