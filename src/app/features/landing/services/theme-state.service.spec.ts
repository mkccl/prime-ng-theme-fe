import { TestBed } from '@angular/core/testing';

import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { ThemeState, ThemeStateService } from './theme-state.service';

describe('ThemeStateService', () => {
  let service: ThemeStateService;

  beforeEach(() => {
    document.documentElement.classList.remove('p-dark');
    document.documentElement.dir = 'ltr';
    delete (document as Document & { __themeState?: ThemeState }).__themeState;

    TestBed.configureTestingModule({
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    });
    service = TestBed.inject(ThemeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose defaults that match the configured application preset', () => {
    expect(service.selectedPrimary()).toBe('emerald');
    expect(service.selectedSurface()).toBe('slate');
    expect(service.selectedPreset()).toBe('Material');
  });

  it('should store the initial theme state on document', () => {
    const stored = (document as Document & { __themeState?: ThemeState }).__themeState;

    expect(stored).toEqual({
      primary: 'emerald',
      surface: 'slate',
      preset: 'Material',
      isDark: false,
    });
  });

  it('should update primary and surface selections', () => {
    service.setPrimary('blue');
    service.setSurface('zinc');

    expect(service.selectedPrimary()).toBe('blue');
    expect(service.selectedSurface()).toBe('zinc');
  });

  it('should update a valid preset and ignore an unknown preset', () => {
    service.setPreset('Lara');
    expect(service.selectedPreset()).toBe('Lara');

    service.setPreset('Unknown');
    expect(service.selectedPreset()).toBe('Lara');
  });

  it('should toggle dark mode and its document class', () => {
    service.toggleDark();
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('p-dark')).toBe(true);

    service.toggleDark();
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('p-dark')).toBe(false);
  });

  it('should broadcast the exact resulting state', () => {
    let emitted: ThemeState | undefined;
    const listener = (event: Event) => {
      emitted = (event as CustomEvent<ThemeState>).detail;
    };
    document.addEventListener('theme-switcher-change', listener, { once: true });

    service.setPrimary('rose');

    expect(emitted).toEqual({
      primary: 'rose',
      surface: 'slate',
      preset: 'Material',
      isDark: false,
    });
    expect((document as Document & { __themeState?: ThemeState }).__themeState).toEqual(emitted);
  });

  it('should expose all configured choices', () => {
    expect(service.primaryColors.length).toBe(17);
    expect(service.surfaceColors.length).toBe(5);
    expect(service.presetOptions).toEqual(['Aura', 'Material', 'Lara', 'Nora']);
  });
});
