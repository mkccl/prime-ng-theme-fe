import { getStarterTheme, STARTER_THEMES } from './starter-themes';

describe('starter-themes', () => {
  it('provides the three advertised starter themes', () => {
    expect(STARTER_THEMES.map((theme) => theme.id)).toEqual([
      'shadcn',
      'bootstrap',
      'material',
    ]);
  });

  it('uses shadcn neutral tokens and compact component styling', () => {
    const theme = getStarterTheme('shadcn')!;
    const preset = theme.preset as any;

    expect(preset.semantic.colorScheme.light.primary.color).toBe('{zinc.950}');
    expect(preset.semantic.colorScheme.light.content.borderColor).toBe('{zinc.200}');
    expect(preset.components.button.root.raisedShadow).toBe('none');
    expect(preset.components.card.root.borderRadius).toBe('{border.radius.lg}');
    expect(preset.components.datatable.colorScheme.light.headerCell.background).toBe(
      '{surface.50}',
    );
    expect(preset.components.datatable.colorScheme.dark.headerCell.background).toBe(
      '{surface.950}',
    );
    expect(theme.fontFamily).toBe('Inter var');
  });

  it('uses Bootstrap 5 colors, spacing, borders, and system typography', () => {
    const theme = getStarterTheme('bootstrap')!;
    const preset = theme.preset as any;

    expect(preset.semantic.colorScheme.light.primary.color).toBe('#0d6efd');
    expect(preset.semantic.colorScheme.light.content.borderColor).toBe('#dee2e6');
    expect(preset.semantic.formField.paddingY).toBe('0.375rem');
    expect(preset.components.button.root.paddingX).toBe('0.75rem');
    expect(preset.components.datatable.colorScheme.light.headerCell.background).toBe(
      '{surface.50}',
    );
    expect(preset.components.datatable.colorScheme.dark.headerCell.background).toBe(
      '{content.background}',
    );
    expect(theme.fontFamily).toBe('system-ui');
    expect(theme.fontSize).toBe('16px');
  });

  it('builds Material on the official preset with purple and Roboto', () => {
    const theme = getStarterTheme('material')!;
    const preset = theme.preset as any;

    expect(preset.semantic.primary[500]).toBe('{materialpurple.500}');
    expect(preset.components.card.root.shadow).toContain('rgba(0,0,0,.2)');
    expect(preset.components.inputtext.root.focusRing.width).toBe(
      '{form.field.focus.ring.width}',
    );
    expect(theme.fontFamily).toBe('Roboto');
  });
});
