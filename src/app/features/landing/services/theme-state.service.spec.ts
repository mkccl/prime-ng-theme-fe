import { TestBed } from '@angular/core/testing';

import { ThemeStateService } from './theme-state.service';

describe('ThemeStateService', () => {
  let service: ThemeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeStateService);
    document.documentElement.classList.remove('p-dark');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default primary as emerald', () => {
    expect(service.selectedPrimary()).toBe('emerald');
  });

  it('should have default surface as slate', () => {
    expect(service.selectedSurface()).toBe('slate');
  });

  it('should have default preset as Aura', () => {
    expect(service.selectedPreset()).toBe('Aura');
  });

  it('should default to light mode', () => {
    expect(service.isDark()).toBe(false);
  });

  it('should update primary selection', () => {
    service.setPrimary('blue');
    expect(service.selectedPrimary()).toBe('blue');
  });

  it('should update surface selection', () => {
    service.setSurface('zinc');
    expect(service.selectedSurface()).toBe('zinc');
  });

  it('should update preset selection', () => {
    service.setPreset('Material');
    expect(service.selectedPreset()).toBe('Material');
  });

  it('should toggle dark mode on', () => {
    service.toggleDark();
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('p-dark')).toBe(true);
  });

  it('should toggle dark mode off again', () => {
    service.toggleDark();
    service.toggleDark();
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('p-dark')).toBe(false);
  });

  it('should return correct theme state', () => {
    service.setPrimary('rose');
    service.setSurface('stone');
    const state = service.getThemeState();
    expect(state.primary).toBe('rose');
    expect(state.surface).toBe('stone');
    expect(state.preset).toBe('Aura');
    expect(state.isDark).toBe(false);
  });

  it('should expose primary colors array', () => {
    expect(service.primaryColors.length).toBeGreaterThan(0);
    expect(service.primaryColors[0]).toHaveProperty('name');
    expect(service.primaryColors[0]).toHaveProperty('color');
  });

  it('should expose surface colors array', () => {
    expect(service.surfaceColors.length).toBe(5);
  });
});
