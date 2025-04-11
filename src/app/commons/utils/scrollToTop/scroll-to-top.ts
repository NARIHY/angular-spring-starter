import {ElementRef} from '@angular/core';

export function scrollToTop() {
  window.scrollTo(0, 0);
}


export function scrollSmooth(el: ElementRef) {
  el.nativeElement.scrollIntoView({behavior: 'smooth'});
}
