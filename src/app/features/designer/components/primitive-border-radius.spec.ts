import { ComponentFixture, TestBed } from '@angular/core/testing';
import { $dt } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Material from '@primeuix/themes/material';
import Nora from '@primeuix/themes/nora';
import { providePrimeNG } from 'primeng/config';

import { PrimitiveBorderRadius } from './primitive-border-radius';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('PrimitiveBorderRadius', () => {
  let fixture: ComponentFixture<PrimitiveBorderRadius>;
  let component: PrimitiveBorderRadius;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveBorderRadius],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.createThemeFromPreset('Test', structuredClone(Aura));

    fixture = TestBed.createComponent(PrimitiveBorderRadius);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 6 token fields for border radius sizes', () => {
    const tokenFields = el.querySelectorAll('design-token-field');
    expect(tokenFields.length).toBe(6);
  });

  it('should display labels for all radius sizes', () => {
    const labels = el.querySelectorAll('label');
    const labelTexts = Array.from(labels).map((l) => l.textContent?.trim());
    expect(labelTexts).toContain('None');
    expect(labelTexts).toContain('Extra Small');
    expect(labelTexts).toContain('Small');
    expect(labelTexts).toContain('Medium');
    expect(labelTexts).toContain('Large');
    expect(labelTexts).toContain('Extra Large');
  });

  it('should read border radius from preset', () => {
    const borderRadius = service.designer().theme?.preset?.primitive?.borderRadius;
    expect(borderRadius).toBeTruthy();
    expect(component.borderRadiusMd).toBeTruthy();
  });

  it('should update preset on border radius change', () => {
    component.borderRadiusMd = '12px';
    const updated = service.designer().theme?.preset?.primitive?.borderRadius?.md;
    expect(updated).toBe('12px');
  });

  it('should select the radius reference configured by each preset', async () => {
    const cases = [
      { preset: Aura, expected: '{border.radius.md}' },
      { preset: Lara, expected: '{border.radius.md}' },
      { preset: Material, expected: '{border.radius.sm}' },
      { preset: Nora, expected: '{border.radius.xs}' },
    ];

    for (const { preset, expected } of cases) {
      service.createThemeFromPreset('Test', structuredClone(preset));
      fixture.detectChanges();
      await fixture.whenStable();

      const select = el.querySelector<HTMLSelectElement>('#form-field-border-radius');
      expect(select?.value).toBe(expected);
    }
  });

  it('should render an option for each primitive radius with its current value', () => {
    const options = Array.from(
      el.querySelectorAll<HTMLOptionElement>('#form-field-border-radius option'),
    );

    expect(options.length).toBe(6);
    expect(options.map((option) => option.value)).toEqual([
      '{border.radius.none}',
      '{border.radius.xs}',
      '{border.radius.sm}',
      '{border.radius.md}',
      '{border.radius.lg}',
      '{border.radius.xl}',
    ]);
    expect(options.map((option) => option.textContent?.trim())).toContain('Large — 8px');
  });

  it('should update the form field radius reference without changing inherited button tokens', async () => {
    const before = structuredClone(service.designer().theme!.preset);
    const select = el.querySelector<HTMLSelectElement>('#form-field-border-radius')!;

    select.value = '{border.radius.lg}';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();

    const preset = service.designer().theme!.preset;
    expect(preset.semantic.formField.borderRadius).toBe('{border.radius.lg}');
    expect(preset.primitive.borderRadius).toEqual(before.primitive.borderRadius);
    expect(preset.components.button.root.borderRadius).toBe(
      before.components.button.root.borderRadius,
    );
    expect(preset.components.button.root.roundedBorderRadius).toBe(
      before.components.button.root.roundedBorderRadius,
    );
  });

  it('should not change the selected reference when a primitive value changes', () => {
    const selected = service.designer().theme!.preset.semantic.formField.borderRadius;

    component.borderRadiusLg = '16px';

    expect(service.designer().theme!.preset.semantic.formField.borderRadius).toBe(selected);
  });

  it('should preserve a custom imported radius reference as an option', async () => {
    service.designer.update((prev) => ({
      ...prev,
      theme: {
        ...prev.theme!,
        preset: {
          ...prev.theme!.preset,
          semantic: {
            ...prev.theme!.preset.semantic,
            formField: {
              ...prev.theme!.preset.semantic.formField,
              borderRadius: '10px',
            },
          },
        },
      },
    }));
    fixture.detectChanges();
    await fixture.whenStable();

    const select = el.querySelector<HTMLSelectElement>('#form-field-border-radius')!;
    const customOption = Array.from(select.options).find((option) => option.value === '10px');

    expect(select.value).toBe('10px');
    expect(customOption?.textContent?.trim()).toBe('Custom — 10px');
    expect(service.designer().theme!.preset.semantic.formField.borderRadius).toBe('10px');
  });

  it('should resolve a selected larger radius through the applied button token', async () => {
    component.borderRadiusLg = '17px';
    fixture.detectChanges();
    await fixture.whenStable();

    const select = el.querySelector<HTMLSelectElement>('#form-field-border-radius')!;
    select.value = '{border.radius.lg}';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();

    service.applyTheme();

    expect($dt('form.field.border.radius').value).toBe('17px');
    expect($dt('button.border.radius').value).toBe('17px');
  });
});
