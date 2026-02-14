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
  // TODO: re-enable when blocks feature is ready
  // {
  //   path: 'blocks',
  //   loadChildren: () =>
  //     import('./features/blocks/blocks.routes').then((m) => m.blocksRoutes),
  // },
];
