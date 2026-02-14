import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { palette } from '@primeuix/themes';
import { Fieldset } from 'primeng/fieldset';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { ColorPalette } from './color-palette';

@Component({
  selector: 'design-primitive-colors',
  standalone: true,
  imports: [Fieldset, ColorPalette],
  template: `
    <p-fieldset legend="Colors" [toggleable]="true">
      @for (key of colorKeys(); track key) {
        <section class="flex justify-between items-center mb-3 gap-6">
          <div class="flex gap-2 items-center">
            <span class="text-sm capitalize w-20">{{ key }}</span>
            <input
              type="color"
              [value]="designerService.resolveColor(preset().primitive[key]['500'])"
              (change)="onColorChange($event, key)"
            />
          </div>
          <design-color-palette [value]="preset().primitive[key]" class="flex-1" />
        </section>
      }
    </p-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimitiveColors {
  protected readonly designerService = inject(ThemeDesignerService);

  protected readonly preset = computed(() => this.designerService.designer().theme!.preset);

  protected readonly colorKeys = computed(() =>
    Object.keys(this.preset().primitive).filter((key) => key !== 'borderRadius'),
  );

  protected onColorChange(event: Event, color: string): void {
    const hex = (event.target as HTMLInputElement).value;
    this.designerService.designer.update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme!,
        preset: {
          ...prev.theme!.preset,
          primitive: {
            ...prev.theme!.preset.primitive,
            [color]: palette(hex),
          },
        },
      },
    }));
    this.designerService.refreshACTokens();
  }
}
