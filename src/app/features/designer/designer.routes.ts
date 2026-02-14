import { Routes } from '@angular/router';

export const designerRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./designer').then((m) => m.Designer),
  },
];
