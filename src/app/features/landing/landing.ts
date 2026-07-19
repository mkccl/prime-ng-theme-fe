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

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Badge } from 'primeng/badge';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Chip } from 'primeng/chip';
import { Divider } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ProgressBar } from 'primeng/progressbar';
import { Select } from 'primeng/select';
import { Slider } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ToggleSwitch } from 'primeng/toggleswitch';

import { DesignerPreviewCard } from './components/designer-preview-card';
import { HowItWorks } from './components/how-it-works';
import { ThemeSwitcher } from './components/theme-switcher';
import { ThemeStateService } from './services/theme-state.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    AvatarModule,
    AvatarGroupModule,
    Badge,
    Button,
    Checkbox,
    Chip,
    Divider,
    InputText,
    Message,
    PasswordModule,
    ProgressBar,
    Select,
    Slider,
    TableModule,
    Tag,
    ToggleSwitch,
    ThemeSwitcher,
    DesignerPreviewCard,
    HowItWorks,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly themeState = inject(ThemeStateService);

  protected readonly isScrolled = signal(false);

  protected readonly stats = [
    { value: '4', label: 'Built-in presets' },
    { value: '17', label: 'Color palettes' },
    { value: '90+', label: 'Themed components' },
    { value: '100%', label: 'Open source' },
  ];

  protected readonly previewChecked = signal(true);
  protected readonly previewSwitch = signal(true);
  protected readonly previewSlider = signal(40);
  protected readonly previewCities = [
    { name: 'New York' },
    { name: 'London' },
    { name: 'Paris' },
    { name: 'Tokyo' },
  ];

  protected readonly loginEmail = signal('');
  protected readonly loginPassword = signal('');
  protected readonly signupName = signal('');
  protected readonly signupEmail = signal('');
  protected readonly signupPassword = signal('');

  protected readonly tableData = [
    { name: 'Alice Johnson', status: 'Active', severity: 'success', date: 'Mar 14' },
    { name: 'Bob Smith', status: 'Pending', severity: 'warn', date: 'Mar 12' },
    { name: 'Carol Lee', status: 'Active', severity: 'success', date: 'Mar 11' },
    { name: 'Dan Nguyen', status: 'Inactive', severity: 'danger', date: 'Mar 09' },
    { name: 'Eve Garcia', status: 'Review', severity: 'info', date: 'Mar 08' },
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
