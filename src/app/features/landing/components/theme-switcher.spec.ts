import { ComponentFixture, TestBed } from '@angular/core/testing';

import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { ThemeSwitcher } from './theme-switcher';

describe('ThemeSwitcher', () => {
  let component: ThemeSwitcher;
  let fixture: ComponentFixture<ThemeSwitcher>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcher],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => {
    document.querySelectorAll('.p-popover').forEach((popover) => popover.remove());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an accessible trigger button', () => {
    const button = el.querySelector<HTMLButtonElement>('.switcher-trigger');

    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Open theme settings');
    expect(button?.querySelector('.pi-cog')).toBeTruthy();
  });

  it('should render labeled theme control groups', async () => {
    await openPopover();
    const labels = Array.from(document.querySelectorAll('.switcher-label')).map((label) =>
      label.textContent?.trim(),
    );

    expect(labels).toEqual(expect.arrayContaining(['Primary', 'Surface', 'Preset']));
  });

  it('should expose pressed state for selected colors and preset', async () => {
    await openPopover();
    const selectedSwatches = document.querySelectorAll('.switcher-swatch[aria-pressed="true"]');
    const selectedPreset = document.querySelector('.switcher-preset-btn[aria-pressed="true"]');

    expect(selectedSwatches.length).toBe(2);
    expect(selectedPreset?.textContent?.trim()).toBe('Material');
  });

  it('should associate labels with toggle inputs', async () => {
    await openPopover();

    expect(document.querySelector('label[for="switcher-dark-mode"]')).toBeTruthy();
    expect(document.querySelector('label[for="switcher-ripple"]')).toBeTruthy();
    expect(document.querySelector('label[for="switcher-rtl"]')).toBeTruthy();
  });

  async function openPopover(): Promise<void> {
    el.querySelector<HTMLButtonElement>('.switcher-trigger')?.click();
    fixture.detectChanges();
    await fixture.whenStable();
  }
});
