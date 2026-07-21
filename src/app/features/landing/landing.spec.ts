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
