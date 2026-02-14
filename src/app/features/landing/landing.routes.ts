import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing').then((m) => m.Landing),
  },
];
