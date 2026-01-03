import { Routes } from '@angular/router';
import { NationComponent } from './pages/nation/nation';
import { JournalComponent } from './pages/journal/journal';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'nation', pathMatch: 'full' },

  {
    path: 'nation',
    component: NationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'journal',
    component: JournalComponent,
    canActivate: [authGuard],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
