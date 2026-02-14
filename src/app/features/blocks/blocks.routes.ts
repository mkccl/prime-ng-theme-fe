import { Routes } from '@angular/router';

export const blocksRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./blocks').then((m) => m.Blocks),
  },
  // TODO: re-enable when block preview iframe work resumes
  // {
  //   path: 'preview/:id',
  //   loadComponent: () => import('./components/block-preview').then((m) => m.BlockPreview),
  // },
];
