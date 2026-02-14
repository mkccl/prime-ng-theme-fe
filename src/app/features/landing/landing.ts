import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Badge } from 'primeng/badge';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Chip } from 'primeng/chip';
import { InputText } from 'primeng/inputtext';
import { ProgressBar } from 'primeng/progressbar';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { ToggleSwitch } from 'primeng/toggleswitch';

import { ThemeSwitcher } from './components/theme-switcher';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    Badge,
    Button,
    Checkbox,
    Chip,
    InputText,
    ProgressBar,
    Select,
    Tag,
    ToggleSwitch,
    ThemeSwitcher,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isScrolled = signal(false);

  protected readonly previewChecked = signal(true);
  protected readonly previewSwitch = signal(true);
  protected readonly previewCities = [
    { name: 'New York' },
    { name: 'London' },
    { name: 'Paris' },
    { name: 'Tokyo' },
  ];

  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        this.isScrolled.set(window.scrollY > 20);
      };

      window.addEventListener('scroll', onScroll, { passive: true });

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
      });
    });
  }
}
