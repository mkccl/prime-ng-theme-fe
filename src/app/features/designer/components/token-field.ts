import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AcToken, ThemeDesignerService } from '../services/theme-designer.service';

let nextId = 0;

@Component({
  selector: 'design-token-field',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex flex-col gap-0.5">
      <label class="text-xs text-[var(--p-text-muted-color)] capitalize truncate">
        {{ label() }}
      </label>
      <div class="relative">
        <input
          type="text"
          [(ngModel)]="modelValue"
          [attr.list]="listId"
          maxlength="100"
          class="border border-[var(--p-content-border-color)] rounded-lg py-1.5 px-2 w-full
            text-xs bg-[var(--p-content-background)] text-[var(--p-text-color)]
            outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
          [class.pr-7]="isColorType()"
          [class.border-red-400]="!modelValue()"
          (input)="onInput($event)"
        />
        <datalist [id]="listId">
          @for (token of filteredTokens(); track token.name) {
            <option [value]="token.label">{{ token.name }}</option>
          }
        </datalist>
        @if (isColorType()) {
          <div
            class="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded border
              border-[var(--p-content-border-color)]"
            [style.backgroundColor]="previewColor()"
          ></div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokenField {
  protected readonly designerService = inject(ThemeDesignerService);

  readonly label = input.required<string>();
  readonly type = input<string | undefined>(undefined);
  readonly switchable = input(false);

  readonly modelValue = model<string | undefined>(undefined);

  readonly listId = `token-field-list-${nextId++}`;

  private readonly query = signal('');

  protected readonly isColorType = computed(() => {
    if (this.type() === 'color') {
      return true;
    }
    const lbl = this.label().toLowerCase();
    return lbl.includes('color') || lbl.includes('background');
  });

  protected readonly previewColor = computed(() => {
    return this.designerService.resolveColor(this.modelValue());
  });

  protected readonly filteredTokens = computed<AcToken[]>(() => {
    const q = this.query();
    if (!q.includes('{')) {
      return [];
    }

    const search = q.slice(q.lastIndexOf('{') + 1).toLowerCase();
    const tokens = this.designerService.acTokens();

    if (!search) {
      return tokens.slice(0, 50);
    }

    return tokens.filter((t) => t.name.toLowerCase().includes(search)).slice(0, 50);
  });

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
  }
}
