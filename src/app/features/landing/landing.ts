import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { DesignerPreviewCard } from './components/designer-preview-card';
import { HowItWorks } from './components/how-it-works';
import { LiveDashboard } from './components/live-dashboard';
import { ThemeSwitcher } from './components/theme-switcher';

interface ProofPoint {
  value: string;
  label: string;
}

interface Capability {
  number: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, ThemeSwitcher, LiveDashboard, DesignerPreviewCard, HowItWorks],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isScrolled = signal(false);

  protected readonly proofPoints: ProofPoint[] = [
    { value: '4', label: 'Curated presets' },
    { value: '17', label: 'Primary palettes' },
    { value: '90+', label: 'Themed components' },
    { value: '100%', label: 'Open source' },
  ];

  protected readonly capabilities: Capability[] = [
    {
      number: '01',
      icon: 'pi pi-bolt',
      title: 'Preview every decision live',
      description:
        'Change a token once and watch controls, data views, navigation, and overlays respond together.',
    },
    {
      number: '02',
      icon: 'pi pi-moon',
      title: 'Design light and dark as one system',
      description:
        'Shape both color schemes with semantic roles instead of maintaining disconnected CSS overrides.',
    },
    {
      number: '03',
      icon: 'pi pi-th-large',
      title: 'Cover the PrimeNG surface area',
      description:
        'Move from primitives to component-level detail while keeping one coherent visual language.',
    },
    {
      number: '04',
      icon: 'pi pi-code',
      title: 'Export code your team owns',
      description:
        'Generate a typed preset, review it in source control, and ship it with your Angular application.',
    },
  ];

  constructor() {
    afterNextRender(() => {
      const onScroll = () => this.isScrolled.set(window.scrollY > 20);

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
}
