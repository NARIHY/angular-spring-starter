import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
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
