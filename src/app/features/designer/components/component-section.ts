import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { TokenField } from './token-field';

function getObjectProperty(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, segment) => {
    if (acc != null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, obj);
}

function setObjectProperty(obj: Record<string, unknown>, path: string, value: unknown): void {
  const segments = path.split('.');
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i];
    if (current[seg] == null || typeof current[seg] !== 'object') {
      current[seg] = {};
    }
    current = current[seg] as Record<string, unknown>;
  }

  current[segments[segments.length - 1]] = value;
}

@Component({
  selector: 'design-component-section',
  standalone: true,
  imports: [TokenField],
  template: `
    <section>
      <div class="text-sm mb-1 font-semibold text-[var(--p-text-color)] capitalize">
        {{ sectionName() }}
      </div>
      @if (hasPrimitiveTokens()) {
        <div class="grid grid-cols-4 gap-x-2 gap-y-3">
          @for (item of primitiveTokensArray(); track item.key) {
            <design-token-field
              [modelValue]="item.value"
              (modelValueChange)="onTokenChange(item.key, $event)"
              [label]="camelCaseToSpaces(item.key)"
              [type]="isColor(item.key) ? 'color' : undefined"
            />
          }
        </div>
      }
      @for (item of nestedTokensArray(); track item.key) {
        <design-component-section
          [componentKey]="componentKey()"
          [path]="path() + '.' + item.key"
          class="block mt-3"
        />
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentSection {
  private readonly designerService = inject(ThemeDesignerService);

  readonly componentKey = input.required<string>();
  readonly path = input.required<string>();

  private readonly preset = computed(() => this.designerService.designer().theme!.preset);

  protected readonly tokens = computed(() => {
    const comp = this.preset().components[this.componentKey()];
    if (!comp) {
      return undefined;
    }
    return getObjectProperty(comp as Record<string, unknown>, this.path()) as
      | Record<string, unknown>
      | undefined;
  });

  protected readonly sectionName = computed(() => {
    const segments = this.path().split('.');
    const filtered = segments.filter((s) => s !== 'colorScheme' && s !== 'light' && s !== 'dark');
    const last = filtered[filtered.length - 1] ?? '';
    return this.camelCaseToSpaces(last);
  });

  protected readonly primitiveTokensArray = computed(() => {
    const t = this.tokens();
    if (!t) {
      return [];
    }
    return Object.keys(t)
      .filter((key) => typeof t[key] === 'string')
      .map((key) => ({ key, value: t[key] as string }));
  });

  protected readonly hasPrimitiveTokens = computed(() => this.primitiveTokensArray().length > 0);

  protected readonly nestedTokensArray = computed(() => {
    const t = this.tokens();
    if (!t) {
      return [];
    }
    return Object.keys(t)
      .filter(
        (key) =>
          typeof t[key] === 'object' && t[key] !== null && key !== 'colorScheme' && key !== 'css',
      )
      .map((key) => ({ key }));
  });

  protected camelCaseToSpaces(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }

  protected isColor(key: string): boolean {
    const lower = key.toLowerCase();
    return lower.includes('color') || lower.includes('background');
  }

  protected onTokenChange(key: string, value: string | undefined): void {
    this.designerService.designer.update((prev) => {
      const cloned = structuredClone(prev);
      const comp = cloned.theme!.preset.components[this.componentKey()];
      if (comp) {
        const fullPath = this.path() + '.' + key;
        setObjectProperty(comp as Record<string, unknown>, fullPath, value);
      }
      return cloned;
    });
  }
}
