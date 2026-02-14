import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ThemeStateService } from '../services/theme-state.service';

@Component({
  selector: 'app-nav-theme-bar',
  standalone: true,
  templateUrl: './nav-theme-bar.html',
  styleUrl: './nav-theme-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavThemeBar {
  protected readonly themeState = inject(ThemeStateService);
}
