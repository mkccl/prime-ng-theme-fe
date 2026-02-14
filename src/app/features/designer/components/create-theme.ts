import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Material from '@primeuix/themes/material';
import Nora from '@primeuix/themes/nora';

import { ThemeDesignerService } from '../services/theme-designer.service';

const presets: Record<string, any> = { Aura, Material, Lara, Nora };

interface PresetOption {
  label: string;
  value: string;
}

const PRESET_OPTIONS: PresetOption[] = [
  { label: 'Aura', value: 'Aura' },
  { label: 'Material', value: 'Material' },
  { label: 'Lara', value: 'Lara' },
  { label: 'Nora', value: 'Nora' },
];

@Component({
  selector: 'design-create-theme',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="p-5">
      <h2 class="text-2xl font-bold mb-6">Create Theme</h2>

      <section class="mb-6">
        <label class="block text-sm font-semibold mb-2">Theme Name</label>
        <input
          [(ngModel)]="themeName"
          type="text"
          placeholder="My Custom Theme"
          maxlength="25"
          class="w-full px-3 py-2 rounded-lg border border-[var(--p-content-border-color)]
            bg-transparent text-sm"
        />
      </section>

      <section class="mb-6">
        <div class="text-sm font-semibold mb-2">Base Preset</div>
        <p class="text-[var(--p-text-muted-color)] text-sm leading-6 mb-4">
          Choose a built-in theme as the starting foundation for your design.
        </p>
        <div class="flex gap-0">
          @for (option of presetOptions; track option.value) {
            <button
              type="button"
              (click)="selectedPreset.set(option.value)"
              class="border border-[var(--p-content-border-color)] px-4 py-2 text-sm border-r-0
                last:border-r first:rounded-l-lg last:rounded-r-lg transition-colors"
              [class.bg-primary]="selectedPreset() === option.value"
              [class.text-primary-contrast]="selectedPreset() === option.value"
              [class.hover:bg-[var(--p-content-hover-background)]]="
                selectedPreset() !== option.value
              "
            >
              {{ option.label }}
            </button>
          }
        </div>
      </section>

      <button
        type="button"
        (click)="create()"
        [disabled]="!themeName()"
        class="w-full px-4 py-2.5 text-sm font-medium bg-primary text-primary-contrast rounded-lg
          hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Theme
      </button>

      <!-- Import Section -->
      <div class="border-t border-[var(--p-content-border-color)] mt-8 pt-6">
        <h3 class="text-lg font-semibold mb-2">Import Theme</h3>
        <p class="text-[var(--p-text-muted-color)] text-sm leading-6 mb-4">
          Paste a base64 theme token to restore a previously exported theme.
        </p>
        <textarea
          [(ngModel)]="importValue"
          rows="4"
          placeholder="Paste base64 theme token here..."
          class="w-full px-3 py-2 rounded-lg border border-[var(--p-content-border-color)] bg-transparent text-xs
            font-mono break-all resize-none mb-3"
        ></textarea>
        @if (importError()) {
          <p class="text-red-500 text-sm mb-3">
            <i class="pi pi-exclamation-triangle mr-1"></i>{{ importError() }}
          </p>
        }
        <button
          type="button"
          (click)="importTheme()"
          [disabled]="!importValue()"
          class="w-full px-4 py-2.5 text-sm font-medium border border-[var(--p-content-border-color)] rounded-lg
            hover:bg-[var(--p-content-hover-background)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="pi pi-upload mr-2"></i>Import
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTheme {
  private readonly designerService = inject(ThemeDesignerService);

  protected readonly presetOptions = PRESET_OPTIONS;
  protected readonly themeName = signal('');
  protected readonly selectedPreset = signal('Aura');
  protected readonly importValue = signal('');
  protected readonly importError = signal('');

  protected create(): void {
    const name = this.themeName().trim();
    if (!name) {
      return;
    }

    const preset = presets[this.selectedPreset()];
    this.designerService.createThemeFromPreset(name, preset);
  }

  protected importTheme(): void {
    const value = this.importValue().trim();
    if (!value) {
      return;
    }

    this.importError.set('');
    const success = this.designerService.importTheme(value);
    if (!success) {
      this.importError.set('Invalid theme token. Please check the value and try again.');
    }
  }
}
