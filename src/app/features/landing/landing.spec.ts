import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { Landing } from './landing';

describe('Landing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideRouter([]), providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();
  });

  it('renders the source-style page landmarks', async () => {
    const fixture = TestBed.createComponent(Landing);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.skip-link')?.getAttribute('href')).toBe('#main-content');
    expect(el.querySelector('.layout-topbar')).toBeTruthy();
    expect(el.querySelector('.landing-announcement')).toBeTruthy();
    expect(el.querySelector('main#main-content')).toBeTruthy();
    expect(el.querySelector('footer.landing-footer')).toBeTruthy();
  });

  it('renders the hero, live dashboard, feature grid, and customer component', async () => {
    const fixture = TestBed.createComponent(Landing);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('#hero-title')?.textContent).toContain('Visual Theme Studio');
    expect(el.querySelector('app-live-dashboard')).toBeTruthy();
    expect(el.querySelectorAll('.feature-card').length).toBe(4);
    expect(el.querySelector('.feature-card')?.textContent).toContain('Design Editor');
    expect(el.querySelector('app-customer-showcase')).toBeTruthy();
  });

  it('shows the repository star count in the GitHub CTA', async () => {
    const fixture = TestBed.createComponent(Landing);
    const component = fixture.componentInstance as unknown as {
      githubStars: { set(value: number): void };
    };
    component.githubStars.set(42);
    fixture.detectChanges();
    await fixture.whenStable();
    const starCount = fixture.nativeElement.querySelector('.github-star-count') as HTMLElement;

    expect(starCount.textContent).toContain('42');
    expect(starCount.getAttribute('aria-label')).toBe('42 GitHub stars');
  });

  it('offers three starter themes and a custom theme entry', async () => {
    const fixture = TestBed.createComponent(Landing);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const cards = el.querySelectorAll('.starter-card');

    expect(cards.length).toBe(4);
    expect(cards[0].textContent).toContain('shadcn');
    expect(cards[1].textContent).toContain('Bootstrap');
    expect(cards[2].textContent).toContain('Material');
    expect(cards[3].textContent).toContain('Create your own');
    expect(cards[0].querySelector('a')?.getAttribute('href')).toContain('starter=shadcn');
    expect(cards[3].querySelector('a')?.getAttribute('href')).toBe('/designer');
  });

  it('exposes six interactive mobile sample options', async () => {
    const fixture = TestBed.createComponent(Landing);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.sample-selector button').length).toBe(6);
  });

  it('opens and closes the keyboard-style search dialog', async () => {
    const fixture = TestBed.createComponent(Landing);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    el.querySelector<HTMLButtonElement>('.search-control')?.click();
    fixture.detectChanges();
    expect(el.querySelector('[role="dialog"]')).toBeTruthy();

    el.querySelector<HTMLButtonElement>('.search-dialog header button')?.click();
    fixture.detectChanges();
    expect(el.querySelector('[role="dialog"]')).toBeFalsy();
  });
});
