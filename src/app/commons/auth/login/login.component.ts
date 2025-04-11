import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent implements OnInit {
// Loader
isLoading: boolean = false;

ngOnInit(): void {
  // Simule un chargement de données
  this.isLoading = true;
  setTimeout(() => {
    this.isLoading = false;
  }, 2000); // Simule un délai de 2 secondes pour le chargement
}
}
