import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThemeDesignerService } from '../services/theme-designer.service';

@Component({
  selector: 'design-settings',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section>
      <div class="text-lg font-semibold mb-3">Font</div>
      <div class="flex gap-4">
        <div>
          <div class="text-sm mb-1 font-semibold text-[var(--p-text-color)]">Base Size</div>
          <select
            [ngModel]="fontSize()"
            (ngModelChange)="onFontSizeChange($event)"
            class="appearance-none px-3 py-2 rounded-lg border border-[var(--p-content-border-color)]
              bg-transparent w-24 text-sm"
          >
            @for (size of designerService.fontSizes; track size) {
              <option [value]="size">{{ size }}</option>
            }
          </select>
        </div>
        <div>
          <div class="text-sm mb-1 font-semibold text-[var(--p-text-color)]">Family</div>
          <select
            [ngModel]="fontFamily()"
            (ngModelChange)="onFontFamilyChange($event)"
            class="appearance-none px-3 py-2 rounded-lg border border-[var(--p-content-border-color)]
              bg-transparent w-52 text-sm"
          >
            @for (font of designerService.fonts; track font) {
              <option [value]="font">{{ font }}</option>
            }
          </select>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  protected readonly designerService = inject(ThemeDesignerService);

  protected readonly fontSize = computed(
    () => this.designerService.designer().theme?.config.fontSize ?? '14px',
  );

  protected readonly fontFamily = computed(
    () => this.designerService.designer().theme?.config.fontFamily ?? 'Inter var',
  );

  protected onFontSizeChange(size: string): void {
    this.designerService.designer.update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme!,
        config: {
          ...prev.theme!.config,
          fontSize: size,
        },
      },
    }));

    document.documentElement.style.fontSize = size;
  }

  protected async onFontFamilyChange(fontFamily: string): Promise<void> {
    this.designerService.designer.update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme!,
        config: {
          ...prev.theme!.config,
          fontFamily,
        },
      },
    }));

    await this.designerService.applyFont(fontFamily);
  }
}
