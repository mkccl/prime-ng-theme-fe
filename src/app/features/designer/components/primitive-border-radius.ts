import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Fieldset } from 'primeng/fieldset';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { TokenField } from './token-field';

@Component({
  selector: 'design-primitive-border-radius',
  standalone: true,
  imports: [Fieldset, TokenField],
  template: `
    <p-fieldset legend="Border Radius" [toggleable]="true">
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
