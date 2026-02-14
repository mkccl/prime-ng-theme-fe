import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { usePreset } from '@primeuix/themes';

import { ThemeDesignerService } from '../services/theme-designer.service';

interface TokenEntry {
  name: string;
  value: string;
}

@Component({
  selector: 'design-custom-tokens',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <p class="text-[var(--p-text-muted-color)] leading-6 mb-4">
        Extend the theming system with your own design tokens e.g.
        <span class="font-medium">accent.color</span>.
      </p>

      @if (tokens().length) {
        <ul class="flex flex-col gap-3 list-none p-0 m-0 mb-4">
          @for (token of tokens(); track $index) {
            <li class="border-b border-[var(--p-content-border-color)] pb-3">
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1 flex-1">
                  <span class="text-sm">Name</span>
                  <input
                    [(ngModel)]="token.name"
                    type="text"
                    placeholder="custom.token.name"
                    maxlength="100"
                    class="border border-[var(--p-content-border-color)] rounded-lg py-1.5 px-2
                      w-full text-sm bg-transparent"
                  />
                </label>
                <label class="flex items-center gap-1 flex-1">
                  <span class="text-sm">Value</span>
                  <input
                    [(ngModel)]="token.value"
                    type="text"
                    placeholder="token value"
                    maxlength="100"
                    class="border border-[var(--p-content-border-color)] rounded-lg py-1.5 px-2
                      w-full text-sm bg-transparent"
                  />
                </label>
                <button
                  type="button"
                  (click)="removeToken($index)"
                  class="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600
                    flex items-center justify-center"
                >
                  <i class="pi pi-times text-xs"></i>
                </button>
              </div>
            </li>
          }
        </ul>
      }

      <div class="flex justify-between">
        <button
          type="button"
          (click)="addToken()"
          class="px-4 py-2 text-sm border border-[var(--p-content-border-color)] rounded-lg
            hover:bg-[var(--p-content-hover-background)]"
        >
          Add New
        </button>
        <button
          type="button"
          (click)="save()"
          class="px-4 py-2 text-sm bg-primary text-primary-contrast rounded-lg hover:bg-primary/90"
        >
          Save
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTokens implements OnInit {
  protected readonly designerService = inject(ThemeDesignerService);

  protected readonly tokens = signal<TokenEntry[]>([]);

  ngOnInit(): void {
    const preset = this.designerService.designer().theme?.preset;
    if (preset?.extend) {
      const entries: TokenEntry[] = [];
      this.objectToDotNotation(preset.extend, '', entries);
      this.tokens.set(entries);
    }
  }

  protected addToken(): void {
    this.tokens.update((prev) => [...prev, { name: '', value: '' }]);
  }

  protected removeToken(index: number): void {
    this.tokens.update((prev) => prev.filter((_, i) => i !== index));
  }

  protected save(): void {
    const entries = this.tokens();
    let extend: Record<string, unknown> = {};

    for (const entry of entries) {
      if (entry.name && entry.value) {
        const nested = this.transformTokenName(entry.name, entry.value);
        extend = this.mergeObjects(extend, nested);
      }
    }

    this.designerService.designer.update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme!,
        preset: {
          ...prev.theme!.preset,
          extend,
        },
      },
    }));

    usePreset(this.designerService.designer().theme!.preset);
    this.designerService.refreshACTokens();
  }

  private objectToDotNotation(
    obj: Record<string, unknown>,
    prefix: string,
    result: TokenEntry[],
  ): void {
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue;
      }

      const path = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        this.objectToDotNotation(value as Record<string, unknown>, path, result);
      } else {
        result.push({ name: path, value: String(value) });
      }
    }
  }

  private transformTokenName(name: string, value: string): Record<string, unknown> {
    const keys = name.split('.');
    const result: Record<string, unknown> = {};
    let current: Record<string, unknown> = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const nested: Record<string, unknown> = {};
      current[keys[i]] = nested;
      current = nested;
    }

    current[keys[keys.length - 1]] = value;
    return result;
  }

  private mergeObjects(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    const output = { ...target };

    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        continue;
      }

      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        typeof output[key] === 'object' &&
        output[key] !== null
      ) {
        output[key] = this.mergeObjects(
          output[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>,
        );
      } else {
        output[key] = source[key];
      }
    }

    return output;
  }
}
