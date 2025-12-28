import { Routes } from '@angular/router';
import { NationComponent } from './pages/nation/nation';

export const routes: Routes = [
  { path: '', redirectTo: 'nation', pathMatch: 'full' },
  { path: 'nation', component: NationComponent },
];
