import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DEFAULT_THEME_PRESET, THEME_PRESETS } from './theme-presets';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: THEME_PRESETS[DEFAULT_THEME_PRESET],
        options: {
          darkModeSelector: '.p-dark',
        },
      },
    }),
  ],
};
