import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span class="logo">Logo</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/home">Home</button>
      <button mat-button routerLink="/products">Products</button>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .logo {
      font-weight: bold;
    }
  `]
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Implement logout logic if needed
    this.router.navigate(['/login']);
  }
}
