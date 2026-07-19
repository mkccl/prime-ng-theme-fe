import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import type { Preset } from '@primeuix/themes/types';

import Material from './material-preset';

export const THEME_PRESET_OPTIONS = ['Aura', 'Material', 'Lara', 'Nora'] as const;
export type ThemePresetName = (typeof THEME_PRESET_OPTIONS)[number];

export const DEFAULT_THEME_PRESET: ThemePresetName = 'Material';

export const THEME_PRESETS: Record<ThemePresetName, Preset> = {
  Aura,
  Material,
  Lara,
  Nora,
};
