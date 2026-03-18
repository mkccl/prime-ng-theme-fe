import { computed, Injectable, signal } from '@angular/core';
import { $dt, usePreset } from '@primeuix/themes';

export interface AcToken {
  name: string;
  label: string;
  variable: string;
  value: string;
  isColor: boolean;
}

export interface ThemeConfig {
  fontSize: string;
  fontFamily: string;
}

export interface ThemeState {
  name: string;
  preset: any;
  config: ThemeConfig;
}

export interface DesignerState {
  activeView: 'create' | 'editor';
  activeTab: number;
  theme: ThemeState | null;
  acTokens: AcToken[];
}

const FONT_LIST = [
  'Inter var',
  'Archivo',
  'Assistant',
  'Cairo',
  'Figtree',
  'Hanken Grotesk',
  'IBM Plex Sans',
  'Instrument Sans',
  'Inter',
  'Josefin Sans',
  'Lexend',
  'Montserrat',
  'Mulish',
  'Nunito',
  'Nunito Sans',
  'Open Sans',
  'Outfit',
  'Poppins',
  'Public Sans',
  'Quicksand',
  'Raleway',
  'Roboto',
  'Rubik',
  'Source Sans 3',
  'Work Sans',
  'Yantramanav',
];

const FONT_SIZES = ['12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px'];

@Injectable({ providedIn: 'root' })
export class ThemeDesignerService {
  readonly fonts = FONT_LIST;
  readonly fontSizes = FONT_SIZES;

  readonly designer = signal<DesignerState>({
    activeView: 'create',
    activeTab: 0,
    theme: null,
    acTokens: [],
  });

  readonly acTokens = computed(() => this.designer().acTokens);

  resolveColor(token: string | undefined): string {
    if (!token) {
      return '';
    }

    let color: string;
    if (token.startsWith('{') && token.endsWith('}')) {
      const cssVariable = $dt(token).variable.slice(4, -1);
      color = getComputedStyle(document.documentElement).getPropertyValue(cssVariable);
    } else {
      color = token;
    }

    return this.removeAlphaTransparency(color);
  }

  removeAlphaTransparency(color: string): string {
    if (color && /^#[0-9A-Fa-f]{8}$/.test(color)) {
      return color.slice(0, 7);
    }
    return color;
  }

  resolveColorPlain(color: string | undefined): string {
    if (!color) {
      return '';
    }
    if (color.startsWith('{') && color.endsWith('}')) {
      return $dt(color).variable;
    }
    return color;
  }

  refreshACTokens(): void {
    this.designer.update((prev) => ({ ...prev, acTokens: [] }));
    const theme = this.designer().theme;
    if (theme) {
      this.generateACTokens(null, theme.preset);
    }
  }

  generateACTokens(parentPath: string | null, obj: Record<string, unknown>): void {
    for (const key in obj) {
      if (key === 'dark' || key === 'components' || key === 'directives') {
        continue;
      }

      if (
        key === 'primitive' ||
        key === 'semantic' ||
        key === 'colorScheme' ||
        key === 'light' ||
        key === 'extend'
      ) {
        this.generateACTokens(null, obj[key] as Record<string, unknown>);
      } else {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          this.generateACTokens(
            parentPath ? parentPath + '.' + key : key,
            obj[key] as Record<string, unknown>,
          );
        } else {
          const regex = /\.\d+$/;
          const tokenName = this.camelCaseToDotCase(parentPath ? parentPath + '.' + key : key);
          const tokenValue = String(obj[key]);
          const isColor =
            tokenName.includes('color') ||
            tokenName.includes('background') ||
            regex.test(tokenName) ||
            tokenValue.startsWith('#') ||
            tokenValue.startsWith('rgb') ||
            tokenValue.startsWith('hsl') ||
            tokenValue.startsWith('oklch');

          this.designer.update((prev) => ({
            ...prev,
            acTokens: [
              ...prev.acTokens,
              {
                name: tokenName,
                label: '{' + tokenName + '}',
                variable: $dt(tokenName).variable,
                value: tokenValue,
                isColor,
              },
            ],
          }));
        }
      }
    }
  }

  camelCaseToDotCase(name: string): string {
    return name.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
  }

  applyTheme(showMessage = false): void {
    const theme = this.designer().theme;
    if (!theme) {
      return;
    }
    usePreset(theme.preset);
    this.refreshACTokens();
    if (showMessage) {
      console.info('Theme applied successfully.');
    }
  }

  createThemeFromPreset(name: string, preset: any): void {
    const cloned = structuredClone(preset);
    this.designer.update((prev) => ({
      ...prev,
      theme: {
        name,
        preset: cloned,
        config: { fontSize: '14px', fontFamily: 'Inter var' },
      },
      activeView: 'editor',
      activeTab: 0,
      acTokens: [],
    }));

    usePreset(cloned);
    this.refreshACTokens();
    document.documentElement.style.fontSize = '14px';
  }

  openCreateTheme(): void {
    this.designer.update((prev) => ({ ...prev, activeView: 'create' }));
  }

  async downloadTheme(): Promise<void> {
    const theme = this.designer().theme;
    if (!theme) {
      return;
    }

    const presetJson = this.serializePreset(theme.preset);
    const fileName = this.slugify(theme.name) + '-preset.ts';
    const content = `/* eslint-disable */
// Generated by https://theme-designer.ccl.wtf
// Theme: ${theme.name}

export default ${presetJson} as const;
`;

    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async applyFont(fontFamily: string): Promise<void> {
    if (fontFamily !== 'Inter var') {
      await this.loadFont(fontFamily, 400);
      await this.loadFont(fontFamily, 500);
      await this.loadFont(fontFamily, 600);
      await this.loadFont(fontFamily, 700);
    } else {
      document.body.style.fontFamily = '"Inter var", sans-serif';
    }
  }

  async loadFont(fontFamily: string, weight: number): Promise<FontFace | undefined> {
    try {
      const fontFamilyPath = fontFamily.toLowerCase().replace(/\s+/g, '-');
      const fontUrl = `https://fonts.bunny.net/${fontFamilyPath}/files/${fontFamilyPath}-latin-${weight}-normal.woff2`;
      const font = new FontFace(fontFamily, `url(${fontUrl})`, {
        weight: weight.toString(),
        style: 'normal',
      });

      const loadedFont = await font.load();
      document.fonts.add(loadedFont);
      document.body.style.fontFamily = `"${fontFamily}", sans-serif`;
      return loadedFont;
    } catch {
      // silent fail -- some fonts may not have all weights
      return undefined;
    }
  }

  encodeTheme(): string {
    const theme = this.designer().theme;
    if (!theme) {
      return '';
    }
    const payload = { name: theme.name, preset: theme.preset, config: theme.config };
    const json = JSON.stringify(payload, (_key, value) => {
      if (typeof value === 'function') {
        return undefined;
      }
      return value as unknown;
    });
    return btoa(unescape(encodeURIComponent(json)));
  }

  decodeTheme(base64: string): ThemeState | null {
    try {
      const json = decodeURIComponent(escape(atob(base64)));
      const payload = JSON.parse(json) as Record<string, unknown>;
      if (!payload['preset'] || typeof payload['preset'] !== 'object') {
        return null;
      }
      return {
        name: (payload['name'] as string) || 'Imported Theme',
        preset: payload['preset'],
        config: (payload['config'] as ThemeConfig) || { fontSize: '14px', fontFamily: 'Inter var' },
      };
    } catch {
      return null;
    }
  }

  importTheme(base64: string): boolean {
    const theme = this.decodeTheme(base64);
    if (!theme) {
      return false;
    }
    this.applyImportedTheme(theme);
    return true;
  }

  async compressThemeForUrl(): Promise<string> {
    const theme = this.designer().theme;
    if (!theme) return '';
    const payload = { name: theme.name, preset: theme.preset, config: theme.config };
    const json = JSON.stringify(payload, (_key, value) =>
      typeof value === 'function' ? undefined : (value as unknown),
    );
    const bytes = new TextEncoder().encode(json);
    const cs = new CompressionStream('gzip');
    const writer = cs.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const compressed = await new Response(cs.readable).arrayBuffer();
    const binary = Array.from(new Uint8Array(compressed), (b) => String.fromCharCode(b)).join('');
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  async importThemeFromUrl(compressed: string): Promise<boolean> {
    const theme = await this.decompressThemeFromUrl(compressed);
    if (!theme) return false;
    this.applyImportedTheme(theme);
    return true;
  }

  private async decompressThemeFromUrl(urlSafe: string): Promise<ThemeState | null> {
    try {
      const base64 = urlSafe.replace(/-/g, '+').replace(/_/g, '/');
      const binary = atob(base64);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      // Check gzip magic number (0x1F 0x8B) to avoid uncatchable DecompressionStream errors
      if (bytes.length < 2 || bytes[0] !== 0x1f || bytes[1] !== 0x8b) return null;
      const ds = new DecompressionStream('gzip');
      const writer = ds.writable.getWriter();
      writer.write(bytes);
      writer.close();
      const decompressed = await new Response(ds.readable).arrayBuffer();
      const json = new TextDecoder().decode(decompressed);
      const payload = JSON.parse(json) as Record<string, unknown>;
      if (!payload['preset'] || typeof payload['preset'] !== 'object') return null;
      return {
        name: (payload['name'] as string) || 'Imported Theme',
        preset: payload['preset'],
        config: (payload['config'] as ThemeConfig) || { fontSize: '14px', fontFamily: 'Inter var' },
      };
    } catch {
      return null;
    }
  }

  private applyImportedTheme(theme: ThemeState): void {
    this.designer.update((prev) => ({
      ...prev,
      theme,
      activeView: 'editor',
      activeTab: 0,
      acTokens: [],
    }));
    usePreset(theme.preset);
    this.refreshACTokens();
    document.documentElement.style.fontSize = theme.config.fontSize;
  }

  private serializePreset(obj: unknown, indent = 2): string {
    return JSON.stringify(
      obj,
      (key, value) => {
        if (typeof value === 'function') {
          return undefined;
        }
        return value as unknown;
      },
      indent,
    );
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
