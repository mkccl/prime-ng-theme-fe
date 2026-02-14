import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgComponentOutlet } from '@angular/common';

import { updatePrimaryPalette, updateSurfacePalette, usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Material from '@primeuix/themes/material';
import Nora from '@primeuix/themes/nora';

import { SIDEBAR_BLOCKS } from '../models/block-definition';

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

@Component({
  selector: 'app-block-preview',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './block-preview.html',
  styleUrl: './block-preview.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockPreview {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly paramMap = toSignal(this.route.paramMap);

  private currentPreset = 'Aura';
  private currentPrimary = 'emerald';
  private currentSurface = 'slate';

  protected readonly previewComponent = computed(() => {
    const id = this.paramMap()?.get('id');
    if (!id) return null;
    return SIDEBAR_BLOCKS.find((b) => b.id === id)?.previewComponent ?? null;
  });

  constructor() {
    afterNextRender(() => {
      const onMessage = (event: MessageEvent) => {
        if (event.data?.type === 'theme-change') {
          this.applyTheme(event.data);
        }
      };

      window.addEventListener('message', onMessage);
      this.destroyRef.onDestroy(() => window.removeEventListener('message', onMessage));

      window.parent.postMessage({ type: 'theme-state-request' }, '*');
    });
  }

  private applyTheme(data: {
    primary: string;
    surface: string;
    preset: string;
    isDark: boolean;
  }): void {
    if (data.preset !== this.currentPreset && presets[data.preset]) {
      usePreset(presets[data.preset]);
      this.currentPreset = data.preset;
      // After switching preset, re-apply primary and surface
      this.currentPrimary = '';
      this.currentSurface = '';
    }
    if (data.primary !== this.currentPrimary) {
      updatePrimaryPalette(paletteRef(data.primary));
      this.currentPrimary = data.primary;
    }
    if (data.surface !== this.currentSurface) {
      updateSurfacePalette(paletteRef(data.surface));
      this.currentSurface = data.surface;
    }
    document.documentElement.classList.toggle('p-dark', data.isDark);
  }
}
