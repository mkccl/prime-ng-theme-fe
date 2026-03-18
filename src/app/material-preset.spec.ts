import preset from './material-preset';

describe('material-preset', () => {
  it('should export a preset object', () => {
    expect(preset).toBeTruthy();
    expect(preset.primitive).toBeTruthy();
  });

  it('should define border radius values', () => {
    const br = preset.primitive.borderRadius;
    expect(Object.keys(br).length).toBe(6);
    expect(br.none).toBe('0');
  });

  it('should define color palettes with 11 shades each', () => {
    const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    const { borderRadius, ...colors } = preset.primitive;
    for (const [name, palette] of Object.entries(colors)) {
      const keys = Object.keys(palette as Record<string, string>);
      expect(keys).toEqual(shadeKeys);
    }
  });

  it('should have no undefined color values', () => {
    const { borderRadius, ...colors } = preset.primitive;
    for (const [name, palette] of Object.entries(colors)) {
      for (const [shade, value] of Object.entries(palette as Record<string, string>)) {
        expect(value).toBeTruthy();
      }
    }
  });
});
