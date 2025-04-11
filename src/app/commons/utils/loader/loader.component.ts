import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.css',
    standalone: false
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;  // Déclare isLoading comme un Input
}
