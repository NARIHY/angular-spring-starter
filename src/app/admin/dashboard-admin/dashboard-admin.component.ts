import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './dashboard-admin.component.html',
    styleUrl: './dashboard-admin.component.css',
    standalone: false
})
export class DashboardAdminComponent implements OnInit {
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
