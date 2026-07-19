import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fieldset } from 'primeng/fieldset';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { TokenField } from './token-field';

const RADIUS_LABELS: Record<string, string> = {
  none: 'None',
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
};

interface BorderRadiusOption {
  label: string;
  reference: string;
}

@Component({
  selector: 'design-primitive-border-radius',
  standalone: true,
  imports: [FormsModule, Fieldset, TokenField],
  template: `
    <p-fieldset legend="Border Radius" [toggleable]="true">
      <div class="mb-4">
        <label
          for="form-field-border-radius"
          class="block text-sm mb-1 font-semibold text-[var(--p-text-color)]"
        >
          Form fields & standard buttons
        </label>
        <select
          id="form-field-border-radius"
          aria-describedby="form-field-border-radius-help"
          [ngModel]="formFieldBorderRadius()"
          (ngModelChange)="onFormFieldBorderRadiusChange($event)"
          class="appearance-none px-3 py-2 rounded-lg border border-[var(--p-content-border-color)]
            bg-transparent w-full text-sm"
        >
          @for (option of borderRadiusOptions(); track option.reference) {
            <option [value]="option.reference">{{ option.label }}</option>
          }
        </select>
        <p id="form-field-border-radius-help" class="mt-1 text-xs text-[var(--p-text-muted-color)]">
          Choose which value form controls and standard buttons reference. Editing a value below
          does not switch this selection. Use Component → Button → Root for button-only overrides;
          rounded buttons use a separate radius.
        </p>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <design-token-field [(modelValue)]="borderRadiusNone" label="None" />
        <design-token-field [(modelValue)]="borderRadiusXs" label="Extra Small" />
        <design-token-field [(modelValue)]="borderRadiusSm" label="Small" />
        <design-token-field [(modelValue)]="borderRadiusMd" label="Medium" />
        <design-token-field [(modelValue)]="borderRadiusLg" label="Large" />
        <design-token-field [(modelValue)]="borderRadiusXl" label="Extra Large" />
      </div>
    </p-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimitiveBorderRadius {
  protected readonly designerService = inject(ThemeDesignerService);

  protected readonly formFieldBorderRadius = computed(
    () =>
      this.designerService.designer().theme?.preset?.semantic?.formField?.borderRadius as
        string | undefined,
  );

  protected readonly borderRadiusOptions = computed<BorderRadiusOption[]>(() => {
    const borderRadius =
      this.designerService.designer().theme?.preset?.primitive?.borderRadius ?? {};
    const options = Object.entries(borderRadius).map(([key, value]) => ({
      label: `${RADIUS_LABELS[key] ?? key} — ${String(value)}`,
      reference: `{border.radius.${key}}`,
    }));
    const selected = this.formFieldBorderRadius();

    if (selected && !options.some((option) => option.reference === selected)) {
      options.push({ label: `Custom — ${selected}`, reference: selected });
    }

    return options;
  });

  get borderRadiusNone(): string | undefined {
    return this.designerService.designer().theme?.preset?.primitive.borderRadius.none;
  }
  set borderRadiusNone(value: string | undefined) {
    this.updateRadius('none', value);
  }

  get borderRadiusXs(): string | undefined {
    return this.designerService.designer().theme?.preset?.primitive.borderRadius.xs;
  }
  set borderRadiusXs(value: string | undefined) {
    this.updateRadius('xs', value);
  }

  get borderRadiusSm(): string | undefined {
    return this.designerService.designer().theme?.preset?.primitive.borderRadius.sm;
  }
  set borderRadiusSm(value: string | undefined) {
    this.updateRadius('sm', value);
  }

  get borderRadiusMd(): string | undefined {
    return this.designerService.designer().theme?.preset?.primitive.borderRadius.md;
  }
  set borderRadiusMd(value: string | undefined) {
    this.updateRadius('md', value);
  }

  get borderRadiusLg(): string | undefined {
    return this.designerService.designer().theme?.preset?.primitive.borderRadius.lg;
  }
  set borderRadiusLg(value: string | undefined) {
    this.updateRadius('lg', value);
  }

  get borderRadiusXl(): string | undefined {
    return this.designerService.designer().theme?.preset?.primitive.borderRadius.xl;
  }
  set borderRadiusXl(value: string | undefined) {
    this.updateRadius('xl', value);
  }

  protected onFormFieldBorderRadiusChange(reference: string): void {
    this.designerService.designer.update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme!,
        preset: {
          ...prev.theme!.preset,
          semantic: {
            ...prev.theme!.preset.semantic,
            formField: {
              ...prev.theme!.preset.semantic?.formField,
              borderRadius: reference,
            },
          },
        },
      },
    }));
  }

  private updateRadius(key: string, value: string | undefined): void {
    this.designerService.designer.update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme!,
        preset: {
          ...prev.theme!.preset,
          primitive: {
            ...prev.theme!.preset.primitive,
            borderRadius: {
              ...prev.theme!.preset.primitive.borderRadius,
              [key]: value,
            },
          },
        },
      },
    }));
  }
}
