import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { ThemeDesignerService } from '../services/theme-designer.service';

@Component({
  selector: 'design-color-palette',
  standalone: true,
  template: `
    @if (value()) {
      @for (color of objectValues(value()); track $index) {
        <div
          class="flex-1 h-6"
          [style.backgroundColor]="designerService.resolveColor(color)"
          [title]="color"
        ></div>
      }
    }
  `,
  host: {
    class: 'flex border border-[var(--p-content-border-color)] rounded-lg overflow-hidden',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPalette {
  protected readonly designerService = inject(ThemeDesignerService);

  readonly value = input<Record<string, string> | undefined>(undefined);

  protected objectValues(obj: Record<string, string> | undefined): string[] {
    return obj ? Object.values(obj) : [];
  }
}
