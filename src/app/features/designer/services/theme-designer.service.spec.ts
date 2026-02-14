import { TestBed } from '@angular/core/testing';

import { ThemeDesignerService } from './theme-designer.service';

describe('ThemeDesignerService', () => {
  let service: ThemeDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have create as the active view', () => {
      expect(service.designer().activeView).toBe('create');
    });

    it('should have activeTab 0', () => {
      expect(service.designer().activeTab).toBe(0);
    });

    it('should have no theme', () => {
      expect(service.designer().theme).toBeNull();
    });

    it('should have empty acTokens', () => {
      expect(service.designer().acTokens).toEqual([]);
    });

    it('should expose fonts list', () => {
      expect(service.fonts.length).toBeGreaterThan(0);
      expect(service.fonts).toContain('Inter var');
    });

    it('should expose fontSizes list', () => {
      expect(service.fontSizes.length).toBeGreaterThan(0);
      expect(service.fontSizes).toContain('14px');
    });
  });

  describe('removeAlphaTransparency', () => {
    it('should strip alpha from 8-digit hex color', () => {
      expect(service.removeAlphaTransparency('#FF5733FF')).toBe('#FF5733');
    });

    it('should strip alpha from lowercase 8-digit hex', () => {
      expect(service.removeAlphaTransparency('#ff573380')).toBe('#ff5733');
    });

    it('should return 6-digit hex unchanged', () => {
      expect(service.removeAlphaTransparency('#FF5733')).toBe('#FF5733');
    });

    it('should return non-hex colors unchanged', () => {
      expect(service.removeAlphaTransparency('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
    });

    it('should return empty string for empty input', () => {
      expect(service.removeAlphaTransparency('')).toBe('');
    });

    it('should return named colors unchanged', () => {
      expect(service.removeAlphaTransparency('red')).toBe('red');
    });
  });

  describe('camelCaseToDotCase', () => {
    it('should convert simple camelCase', () => {
      expect(service.camelCaseToDotCase('fontSize')).toBe('font.size');
    });

    it('should convert multiple humps', () => {
      expect(service.camelCaseToDotCase('borderRadiusLarge')).toBe('border.radius.large');
    });

    it('should leave already lowercase unchanged', () => {
      expect(service.camelCaseToDotCase('color')).toBe('color');
    });

    it('should handle dotted paths with camelCase segments', () => {
      expect(service.camelCaseToDotCase('primary.darkColor')).toBe('primary.dark.color');
    });
  });

  describe('resolveColor', () => {
    it('should return empty string for undefined', () => {
      expect(service.resolveColor(undefined)).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(service.resolveColor('')).toBe('');
    });

    it('should return plain hex colors directly', () => {
      expect(service.resolveColor('#ff5733')).toBe('#ff5733');
    });

    it('should strip alpha from plain 8-digit hex', () => {
      expect(service.resolveColor('#ff5733aa')).toBe('#ff5733');
    });
  });

  describe('resolveColorPlain', () => {
    it('should return empty string for undefined', () => {
      expect(service.resolveColorPlain(undefined)).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(service.resolveColorPlain('')).toBe('');
    });

    it('should return plain colors directly', () => {
      expect(service.resolveColorPlain('#ff5733')).toBe('#ff5733');
    });
  });

  describe('encodeTheme / decodeTheme', () => {
    it('should return empty string when no theme exists', () => {
      expect(service.encodeTheme()).toBe('');
    });

    it('should encode and decode a theme round-trip', () => {
      const preset = { primitive: { color: '#fff' } };
      service.designer.update((prev) => ({
        ...prev,
        theme: {
          name: 'Test Theme',
          preset,
          config: { fontSize: '16px', fontFamily: 'Roboto' },
        },
      }));

      const encoded = service.encodeTheme();
      expect(encoded).toBeTruthy();
      expect(typeof encoded).toBe('string');

      const decoded = service.decodeTheme(encoded);
      expect(decoded).toBeTruthy();
      expect(decoded!.name).toBe('Test Theme');
      expect(decoded!.config.fontSize).toBe('16px');
      expect(decoded!.config.fontFamily).toBe('Roboto');
      expect(decoded!.preset).toEqual(preset);
    });

    it('should strip functions from preset during encode', () => {
      service.designer.update((prev) => ({
        ...prev,
        theme: {
          name: 'Fn Theme',
          preset: { value: 'hello', fn: () => 'bad' },
          config: { fontSize: '14px', fontFamily: 'Inter var' },
        },
      }));

      const encoded = service.encodeTheme();
      const decoded = service.decodeTheme(encoded);
      expect(decoded!.preset['fn']).toBeUndefined();
      expect(decoded!.preset['value']).toBe('hello');
    });

    it('should handle unicode theme names in round-trip', () => {
      service.designer.update((prev) => ({
        ...prev,
        theme: {
          name: 'Thema Dunkel',
          preset: { primary: '#000' },
          config: { fontSize: '14px', fontFamily: 'Inter var' },
        },
      }));

      const encoded = service.encodeTheme();
      const decoded = service.decodeTheme(encoded);
      expect(decoded!.name).toBe('Thema Dunkel');
    });

    it('should preserve nested preset structure through round-trip', () => {
      const preset = {
        primitive: { red: { 50: '#fef2f2', 100: '#fee2e2', 500: '#ef4444' } },
        semantic: { primary: { color: '{red.500}' } },
        components: { button: { root: { borderRadius: '6px' } } },
      };
      service.designer.update((prev) => ({
        ...prev,
        theme: {
          name: 'Complex',
          preset,
          config: { fontSize: '14px', fontFamily: 'Inter var' },
        },
      }));

      const decoded = service.decodeTheme(service.encodeTheme());
      expect(decoded!.preset).toEqual(preset);
    });
  });

  describe('decodeTheme error handling', () => {
    it('should return null for invalid base64', () => {
      expect(service.decodeTheme('!!! not base64 !!!')).toBeNull();
    });

    it('should return null for valid base64 without preset', () => {
      const encoded = btoa(JSON.stringify({ name: 'No Preset' }));
      expect(service.decodeTheme(encoded)).toBeNull();
    });

    it('should return null for valid base64 with non-object preset', () => {
      const encoded = btoa(JSON.stringify({ preset: 'string' }));
      expect(service.decodeTheme(encoded)).toBeNull();
    });

    it('should use default name when missing', () => {
      const encoded = btoa(JSON.stringify({ preset: { a: 1 } }));
      const decoded = service.decodeTheme(encoded);
      expect(decoded!.name).toBe('Imported Theme');
    });

    it('should use default config when missing', () => {
      const encoded = btoa(JSON.stringify({ preset: { a: 1 } }));
      const decoded = service.decodeTheme(encoded);
      expect(decoded!.config).toEqual({ fontSize: '14px', fontFamily: 'Inter var' });
    });
  });

  describe('generateACTokens', () => {
    it('should generate tokens from flat object', () => {
      service.generateACTokens(null, { primary: '#ff0000' });
      const tokens = service.designer().acTokens;
      expect(tokens.length).toBe(1);
      expect(tokens[0].name).toBe('primary');
      expect(tokens[0].value).toBe('#ff0000');
      expect(tokens[0].isColor).toBe(true);
    });

    it('should generate tokens from nested objects', () => {
      service.generateACTokens(null, { form: { background: '#fff', width: '100px' } });
      const tokens = service.designer().acTokens;
      expect(tokens.length).toBe(2);
      expect(tokens.find((t) => t.name === 'form.background')).toBeTruthy();
      expect(tokens.find((t) => t.name === 'form.width')).toBeTruthy();
    });

    it('should skip dark, components, and directives keys', () => {
      service.generateACTokens(null, {
        dark: { color: '#000' },
        components: { button: {} },
        directives: { tooltip: {} },
        primary: '#ff0000',
      });
      const tokens = service.designer().acTokens;
      expect(tokens.length).toBe(1);
      expect(tokens[0].name).toBe('primary');
    });

    it('should unwrap primitive/semantic/colorScheme/light/extend keys', () => {
      service.generateACTokens(null, {
        primitive: { red: '#f00' },
        semantic: { blue: '#00f' },
      });
      const tokens = service.designer().acTokens;
      expect(tokens.find((t) => t.name === 'red')).toBeTruthy();
      expect(tokens.find((t) => t.name === 'blue')).toBeTruthy();
    });

    it('should detect color tokens by name keywords', () => {
      service.generateACTokens(null, {
        myColor: 'token1',
        myBackground: 'token2',
        myWidth: '10px',
      });
      const tokens = service.designer().acTokens;
      expect(tokens.find((t) => t.name === 'my.color')!.isColor).toBe(true);
      expect(tokens.find((t) => t.name === 'my.background')!.isColor).toBe(true);
      expect(tokens.find((t) => t.name === 'my.width')!.isColor).toBe(false);
    });

    it('should detect color tokens by value prefix', () => {
      service.generateACTokens(null, {
        a: '#ff0000',
        b: 'rgb(0,0,0)',
        c: 'hsl(120,100%,50%)',
        d: 'oklch(0.7 0.2 150)',
        e: '10px',
      });
      const tokens = service.designer().acTokens;
      expect(tokens.find((t) => t.name === 'a')!.isColor).toBe(true);
      expect(tokens.find((t) => t.name === 'b')!.isColor).toBe(true);
      expect(tokens.find((t) => t.name === 'c')!.isColor).toBe(true);
      expect(tokens.find((t) => t.name === 'd')!.isColor).toBe(true);
      expect(tokens.find((t) => t.name === 'e')!.isColor).toBe(false);
    });

    it('should detect color by trailing numeric segment', () => {
      service.generateACTokens('palette', { '500': 'some-val' });
      const tokens = service.designer().acTokens;
      expect(tokens[0].isColor).toBe(true);
    });

    it('should set label with curly braces', () => {
      service.generateACTokens(null, { myToken: 'value' });
      const token = service.designer().acTokens[0];
      expect(token.label).toBe('{my.token}');
    });
  });

  describe('openCreateTheme', () => {
    it('should switch activeView to create', () => {
      service.designer.update((prev) => ({ ...prev, activeView: 'editor' }));
      service.openCreateTheme();
      expect(service.designer().activeView).toBe('create');
    });
  });

  describe('importTheme', () => {
    it('should return false for invalid base64', () => {
      expect(service.importTheme('garbage')).toBe(false);
    });

    it('should return false for base64 without preset', () => {
      const encoded = btoa(JSON.stringify({ name: 'No Preset' }));
      expect(service.importTheme(encoded)).toBe(false);
    });

    it('should import a valid encoded theme', () => {
      const payload = {
        name: 'Imported',
        preset: { primitive: { red: '#f00' } },
        config: { fontSize: '16px', fontFamily: 'Roboto' },
      };
      const encoded = btoa(JSON.stringify(payload));

      const result = service.importTheme(encoded);
      expect(result).toBe(true);
      expect(service.designer().theme!.name).toBe('Imported');
      expect(service.designer().activeView).toBe('editor');
      expect(service.designer().activeTab).toBe(0);
    });

    it('should preserve imported preset data', () => {
      const preset = { primitive: { blue: '#00f' }, semantic: { primary: { color: '#00f' } } };
      const encoded = btoa(
        JSON.stringify({
          name: 'Full',
          preset,
          config: { fontSize: '14px', fontFamily: 'Inter var' },
        }),
      );

      service.importTheme(encoded);
      expect(service.designer().theme!.preset.primitive.blue).toBe('#00f');
      expect(service.designer().theme!.preset.semantic.primary.color).toBe('#00f');
    });

    it('should preserve imported config', () => {
      const encoded = btoa(
        JSON.stringify({
          preset: { primitive: { red: '#f00' } },
          config: { fontSize: '18px', fontFamily: 'Roboto' },
        }),
      );

      service.importTheme(encoded);
      expect(service.designer().theme!.config.fontSize).toBe('18px');
      expect(service.designer().theme!.config.fontFamily).toBe('Roboto');
    });

    it('should clear old acTokens on import', () => {
      service.designer.update((prev) => ({
        ...prev,
        acTokens: [
          { name: 'old', label: '{old}', variable: '--p-old', value: '#000', isColor: true },
        ],
      }));

      const encoded = btoa(JSON.stringify({ preset: { primitive: { blue: '#00f' } } }));
      service.importTheme(encoded);
      const tokens = service.designer().acTokens;
      expect(tokens.find((t) => t.name === 'old')).toBeUndefined();
    });

    it('should support full encode-then-import round-trip', () => {
      // Create a theme, encode it, reset state, then import
      service.designer.update((prev) => ({
        ...prev,
        theme: {
          name: 'Roundtrip Theme',
          preset: { primitive: { green: '#0f0' } },
          config: { fontSize: '16px', fontFamily: 'Poppins' },
        },
      }));

      const encoded = service.encodeTheme();

      // Reset state
      service.designer.update((prev) => ({
        ...prev,
        theme: null,
        activeView: 'create',
        acTokens: [],
      }));
      expect(service.designer().theme).toBeNull();

      // Import the encoded theme
      const result = service.importTheme(encoded);
      expect(result).toBe(true);
      expect(service.designer().theme!.name).toBe('Roundtrip Theme');
      expect(service.designer().theme!.preset.primitive.green).toBe('#0f0');
      expect(service.designer().theme!.config.fontFamily).toBe('Poppins');
      expect(service.designer().activeView).toBe('editor');
    });
  });

  describe('downloadTheme', () => {
    it('should not throw when no theme exists', async () => {
      await expect(service.downloadTheme()).resolves.toBeUndefined();
    });

    it('should create a download link with correct filename', async () => {
      service.designer.update((prev) => ({
        ...prev,
        theme: {
          name: 'My Cool Theme',
          preset: { color: '#fff' },
          config: { fontSize: '14px', fontFamily: 'Inter var' },
        },
      }));

      const clickSpy = vi.fn();
      const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
        setAttribute: vi.fn(),
        click: clickSpy,
      } as unknown as HTMLAnchorElement);
      vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
      vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

      await service.downloadTheme();

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(clickSpy).toHaveBeenCalled();

      createElementSpy.mockRestore();
    });
  });

  describe('acTokens computed', () => {
    it('should reflect current acTokens from designer state', () => {
      expect(service.acTokens()).toEqual([]);

      service.designer.update((prev) => ({
        ...prev,
        acTokens: [
          { name: 'test', label: '{test}', variable: '--p-test', value: '#fff', isColor: true },
        ],
      }));

      expect(service.acTokens().length).toBe(1);
      expect(service.acTokens()[0].name).toBe('test');
    });
  });
});
