import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CustomerShowcase } from './components/customer-showcase';
import { LiveDashboard } from './components/live-dashboard';
import { ThemeSwitcher } from './components/theme-switcher';
import { ThemeStateService } from './services/theme-state.service';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface SampleOption {
  icon: string;
  title: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgOptimizedImage,
    ThemeSwitcher,
    LiveDashboard,
    CustomerShowcase,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly themeState = inject(ThemeStateService);
  protected readonly isScrolled = signal(false);
  protected readonly searchOpen = signal(false);
  protected readonly activeSample = signal('Overview');
  protected readonly sampleImagePath = computed(() => {
    const sample = this.activeSample() === 'Inbox' ? 'chat' : this.activeSample().toLowerCase();
    return `/landing/${sample}.jpg`;
  });

  protected readonly sampleOptions: SampleOption[] = [
    { icon: 'pi pi-home', title: 'Overview' },
    { icon: 'pi pi-comment', title: 'Chat' },
    { icon: 'pi pi-inbox', title: 'Inbox' },
    { icon: 'pi pi-th-large', title: 'Cards' },
    { icon: 'pi pi-user', title: 'Customers' },
    { icon: 'pi pi-video', title: 'Movies' },
  ];

  protected readonly features: FeatureItem[] = [
    {
      icon: '/landing/icon-theme.svg',
      title: 'Design Editor',
      description:
        'Shape primitives, semantic roles, and component tokens in one focused visual workspace.',
    },
    {
      icon: '/landing/icon-accessibility.svg',
      title: 'Accessibility',
      description:
        'Review focus, contrast, hierarchy, and interactive states as part of the same visual loop.',
    },
    {
      icon: '/landing/icon-mobile.svg',
      title: 'Responsive Preview',
      description:
        'Review how your theme behaves across desktop and touch-friendly mobile layouts.',
    },
    {
      icon: '/landing/icon-ts.svg',
      title: 'Typed Theme Export',
      description:
        'Export a typed PrimeNG preset that fits directly into your Angular application.',
    },
  ];

  constructor() {
    afterNextRender(() => {
      const windowRef = this.document.defaultView;
      if (!windowRef) return;

      const onScroll = () => this.isScrolled.set(windowRef.scrollY > 0);
      const onKeydown = (event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
          event.preventDefault();
          this.searchOpen.set(true);
        }

        if (event.key === 'Escape') {
          this.searchOpen.set(false);
        }
      };

      onScroll();
      windowRef.addEventListener('scroll', onScroll, { passive: true });
      windowRef.addEventListener('keydown', onKeydown);
      this.destroyRef.onDestroy(() => {
        windowRef.removeEventListener('scroll', onScroll);
        windowRef.removeEventListener('keydown', onKeydown);
      });
    });
  }

  protected selectSample(title: string): void {
    this.activeSample.set(title);
  }
}
