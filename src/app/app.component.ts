import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Keep if you use routing, otherwise remove
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  imports: [NavbarComponent, ParentDashboardComponent], // Import direct children
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-standalone-dashboard';
}