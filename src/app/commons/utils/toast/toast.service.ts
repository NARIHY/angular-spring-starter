import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

// Interface for a toast
export interface Toast {
  icon: IconDefinition;
  date?: string;
  title: string;
  text: string;
  persist?: boolean;  // Optional, if true, the toast will not auto-hide
}

// Interface for a ToastMessage, which includes the toast and additional options like classname
interface ToastMessage {
  toast: Toast;
  classname: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Array to hold the toasts
  toasts: ToastMessage[] = [];

  // Show a toast message
  show(textOrTpl: Toast, options: { classname?: string; persist?: boolean } = {}) {
    const toastMessage: ToastMessage = {
      toast: { ...textOrTpl, persist: textOrTpl.persist ?? false }, // Ensure persist is set (defaults to false if not provided)
      classname: options.classname || 'default-toast-class', // Fallback to a default class if not provided
    };
    this.toasts.push(toastMessage);
  }

  // Remove a specific toast message
  remove(toast: ToastMessage) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
