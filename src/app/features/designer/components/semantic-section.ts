import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { TokenField } from './token-field';

interface TokenEntry {
  key: string;
  value: unknown;
}

@Component({
  selector: 'design-semantic-section',
  standalone: true,
  imports: [TokenField],
  template: `
    <section>
      @if (!root()) {
        <div class="text-sm mb-1 font-semibold text-[var(--p-text-color)] capitalize">
          {{ sectionName() }}
        </div>
      }
      @if (hasPrimitiveTokens()) {
        <div class="grid grid-cols-4 gap-x-2 gap-y-3">
          @for (item of primitiveTokensArray(); track item.key) {
            <design-token-field
              [(modelValue)]="$any(tokens())[item.key]"
              [label]="camelCaseToSpaces(item.key)"
            />
          }
        </div>
      }
      @for (item of nestedTokensArray(); track item.key) {
        <design-semantic-section [path]="path() + '.' + item.key" class="block mt-3" />
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemanticSection {
  private readonly designerService = inject(ThemeDesignerService);

  readonly path = input.required<string>();
  readonly root = input(false);
  readonly switchable = input(false);

  protected readonly tokens = computed<Record<string, unknown>>(() => {
    const semantic = this.designerService.designer().theme?.preset?.semantic as
      | Record<string, unknown>
      | undefined;
    if (!semantic) return {};
    return (this.getObjectProperty(semantic, this.path()) as Record<string, unknown>) ?? {};
  });

  protected readonly primitiveTokensArray = computed<TokenEntry[]>(() => {
    const obj = this.tokens();
    return Object.keys(obj)
      .filter((key) => !this.isObject(obj[key]))
      .map((key) => ({ key, value: obj[key] }));
  });

  protected readonly hasPrimitiveTokens = computed(() => this.primitiveTokensArray().length > 0);

  protected readonly nestedTokensArray = computed<TokenEntry[]>(() => {
    const obj = this.tokens();
    return Object.keys(obj)
      .filter((key) => this.isObject(obj[key]))
      .map((key) => ({ key, value: obj[key] }));
  });

  protected readonly sectionName = computed(() => {
    const segments = this.path()
      .split('.')
      .filter((s) => s !== 'colorScheme' && s !== 'light' && s !== 'dark');
    const last = segments[segments.length - 1] ?? '';
    return this.capitalize(this.camelCaseToSpaces(last));
  });

  protected camelCaseToSpaces(val: string): string {
    return val.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }

  private capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private isObject(val: unknown): boolean {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }

  private getObjectProperty(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((current, segment) => {
      if (current !== null && typeof current === 'object') {
        return (current as Record<string, unknown>)[segment];
      }
      return undefined;
    }, obj);
  }
}
