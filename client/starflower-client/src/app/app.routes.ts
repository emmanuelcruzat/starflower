import { Routes } from '@angular/router';
import { NationComponent } from './pages/nation/nation';
import { JournalComponent } from './pages/journal/journal';

export const routes: Routes = [
  { path: '', redirectTo: 'nation', pathMatch: 'full' },
  { path: 'nation', component: NationComponent },
  { path: 'journal', component: JournalComponent },
];
