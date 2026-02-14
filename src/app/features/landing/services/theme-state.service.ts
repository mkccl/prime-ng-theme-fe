import { Injectable, inject, signal } from '@angular/core';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Material from '@primeuix/themes/material';
import Nora from '@primeuix/themes/nora';
import { updatePrimaryPalette, updateSurfacePalette, usePreset } from '@primeuix/themes';
import { PrimeNG } from 'primeng/config';

export interface ColorOption {
  name: string;
  color: string;
}

export interface ThemeState {
  primary: string;
  surface: string;
  preset: string;
  isDark: boolean;
}

export const PRIMARY_COLORS: ColorOption[] = [
  { name: 'emerald', color: '#10b981' },
  { name: 'green', color: '#22c55e' },
  { name: 'lime', color: '#84cc16' },
  { name: 'red', color: '#ef4444' },
  { name: 'orange', color: '#f97316' },
  { name: 'amber', color: '#f59e0b' },
  { name: 'yellow', color: '#eab308' },
  { name: 'teal', color: '#14b8a6' },
  { name: 'cyan', color: '#06b6d4' },
  { name: 'sky', color: '#0ea5e9' },
  { name: 'blue', color: '#3b82f6' },
  { name: 'indigo', color: '#6366f1' },
  { name: 'violet', color: '#8b5cf6' },
  { name: 'purple', color: '#a855f7' },
  { name: 'fuchsia', color: '#d946ef' },
  { name: 'pink', color: '#ec4899' },
  { name: 'rose', color: '#f43f5e' },
];

export const SURFACE_COLORS: ColorOption[] = [
  { name: 'slate', color: '#64748b' },
  { name: 'gray', color: '#6b7280' },
  { name: 'zinc', color: '#71717a' },
  { name: 'neutral', color: '#737373' },
  { name: 'stone', color: '#78716c' },
];

export const PRESET_OPTIONS = ['Aura', 'Material', 'Lara', 'Nora'] as const;

const presets: Record<string, any> = { Aura, Material, Lara, Nora };

function paletteRef(name: string): Record<string, string> {
  return {
    50: `{${name}.50}`,
    100: `{${name}.100}`,
    200: `{${name}.200}`,
    300: `{${name}.300}`,
    400: `{${name}.400}`,
    500: `{${name}.500}`,
    600: `{${name}.600}`,
    700: `{${name}.700}`,
    800: `{${name}.800}`,
    900: `{${name}.900}`,
    950: `{${name}.950}`,
  };
}

@Injectable({ providedIn: 'root' })
export class ThemeStateService {
  private readonly primeNG = inject(PrimeNG);

  private readonly _selectedPrimary = signal('emerald');
  private readonly _selectedSurface = signal('slate');
  private readonly _selectedPreset = signal('Aura');
  private readonly _isDark = signal(false);

  readonly selectedPrimary = this._selectedPrimary.asReadonly();
  readonly selectedSurface = this._selectedSurface.asReadonly();
  readonly selectedPreset = this._selectedPreset.asReadonly();
  readonly isDark = this._isDark.asReadonly();

  readonly primaryColors = PRIMARY_COLORS;
  readonly surfaceColors = SURFACE_COLORS;
  readonly presetOptions = PRESET_OPTIONS;

  setPrimary(name: string): void {
    this._selectedPrimary.set(name);
    updatePrimaryPalette(paletteRef(name));
    this.broadcast();
  }

  setSurface(name: string): void {
    this._selectedSurface.set(name);
    updateSurfacePalette(paletteRef(name));
    this.broadcast();
  }

  setPreset(name: string): void {
    this._selectedPreset.set(name);
    usePreset(presets[name]);
    this.broadcast();
  }

  toggleDark(): void {
    this._isDark.update((v) => !v);
    document.documentElement.classList.toggle('p-dark', this._isDark());
    this.broadcast();
  }

  toggleRipple(value: boolean): void {
    this.primeNG.ripple.set(value);
  }

  toggleRtl(value: boolean): void {
    document.documentElement.dir = value ? 'rtl' : 'ltr';
  }

  getThemeState(): ThemeState {
    return {
      primary: this._selectedPrimary(),
      surface: this._selectedSurface(),
      preset: this._selectedPreset(),
      isDark: this._isDark(),
    };
  }

  private broadcast(): void {
    const state = this.getThemeState();
    (document as any).__themeState = state;
    document.dispatchEvent(new CustomEvent<ThemeState>('theme-switcher-change', { detail: state }));
  }
}
