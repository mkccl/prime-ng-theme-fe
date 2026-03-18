import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/landing/landing.routes').then((m) => m.landingRoutes),
  },
  {
    path: 'designer',
    loadChildren: () => import('./features/designer/designer.routes').then((m) => m.designerRoutes),
  },
  {
    path: 'changelog',
    loadChildren: () =>
      import('./features/changelog/changelog.routes').then((m) => m.changelogRoutes),
  },
];
