import { Routes } from '@angular/router';

export const changelogRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./changelog').then((m) => m.Changelog),
  },
];
