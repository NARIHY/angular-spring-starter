import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css'
})
export class DashboardClientComponent implements OnInit {
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
