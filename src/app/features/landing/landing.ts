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
import { STARTER_THEMES } from '../../starter-themes';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface SampleOption {
  icon: string;
  title: string;
}

interface GitHubRepository {
  stargazers_count?: unknown;
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
  protected readonly starterThemes = STARTER_THEMES;
  protected readonly isScrolled = signal(false);
  protected readonly searchOpen = signal(false);
  protected readonly activeSample = signal('Overview');
  protected readonly githubStars = signal<number | null>(null);
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

      const abortController = new AbortController();
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
      this.loadGitHubStars(windowRef, abortController.signal);
      this.destroyRef.onDestroy(() => {
        abortController.abort();
        windowRef.removeEventListener('scroll', onScroll);
        windowRef.removeEventListener('keydown', onKeydown);
      });
    });
  }

  protected selectSample(title: string): void {
    this.activeSample.set(title);
  }

  private async loadGitHubStars(windowRef: Window, signal: AbortSignal): Promise<void> {
    if (!windowRef.fetch) return;

    try {
      const response = await windowRef.fetch(
        'https://api.github.com/repos/mkccl/prime-ng-theme-fe',
        {
          headers: { Accept: 'application/vnd.github+json' },
          signal,
        },
      );
      if (!response.ok) return;

      const repository = (await response.json()) as GitHubRepository;
      if (
        typeof repository.stargazers_count === 'number' &&
        Number.isSafeInteger(repository.stargazers_count) &&
        repository.stargazers_count >= 0
      ) {
        this.githubStars.set(repository.stargazers_count);
      }
    } catch {
      // The star count is an enhancement; keep the GitHub CTA usable if the request fails.
    }
  }
}
