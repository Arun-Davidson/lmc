import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { DataService } from './app/services/data.service';

// Import AG-Grid modules
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all community modules globally
ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideHttpClient(),
    provideAnimations(),
    DataService
  ]
}).catch(err => console.error(err));