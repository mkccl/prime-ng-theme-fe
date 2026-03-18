import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { Fieldset } from 'primeng/fieldset';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { SemanticSection } from './semantic-section';
import { TokenField } from './token-field';

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

const SEMANTIC_ORDER = [
  'primary',
  'surface',
  'focusRing',
  'formField',
  'list',
  'navigation',
  'overlay',
  'content',
  'mask',
];

interface TokenEntry {
  key: string;
  value: unknown;
}

@Component({
  selector: 'design-semantic-editor',
  standalone: true,
  imports: [
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    Fieldset,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    TokenField,
    SemanticSection,
  ],
  template: `
    <div (keydown.enter)="onEnter()">
      <p-accordion [value]="['common']" [multiple]="true">
        <p-accordion-panel value="common">
          <p-accordion-header>Common</p-accordion-header>
          <p-accordion-content>
            <div class="p-3 flex flex-col gap-3">
              <p-fieldset legend="General">
                <div class="grid grid-cols-4 gap-x-2 gap-y-3">
                  @for (item of commonPrimitivesArray(); track item.key) {
                    <design-token-field
                      [modelValue]="$any(item.value)"
                      (modelValueChange)="onTokenChange(item.key, $event)"
                      [label]="camelCaseToSpaces(item.key)"
                    />
                  }
                </div>
              </p-fieldset>
              @for (item of commonObjectsArray(); track item.key) {
                <p-fieldset [legend]="capitalize(camelCaseToSpaces(item.key))">
                  <design-semantic-section [path]="item.key" [root]="true" />
                </p-fieldset>
              }
            </div>
          </p-accordion-content>
        </p-accordion-panel>

        <p-accordion-panel value="colorScheme">
          <p-accordion-header>Color Scheme</p-accordion-header>
          <p-accordion-content>
            <div class="p-3">
              <p-tabs [value]="activeSchemeTab()">
                <p-tablist>
                  <p-tab value="light" (click)="darkMode.set(false)">Light</p-tab>
                  <p-tab value="dark" (click)="darkMode.set(true)">Dark</p-tab>
                </p-tablist>
                <p-tabpanels>
                  <p-tabpanel value="light">
                    <div class="flex flex-col gap-3 pt-3">
                      <p-fieldset legend="General">
                        <div class="grid grid-cols-4 gap-x-2 gap-y-3">
                          @for (item of lightPrimitivesArray(); track item.key) {
                            <design-token-field
                              [modelValue]="$any(item.value)"
                              (modelValueChange)="onTokenChange('colorScheme.light.' + item.key, $event)"
                              [label]="camelCaseToSpaces(item.key)"
                            />
                          }
                        </div>
                      </p-fieldset>
                      @for (item of lightObjectsArray(); track item.key) {
                        <p-fieldset [legend]="capitalize(camelCaseToSpaces(item.key))">
                          <design-semantic-section
                            [path]="'colorScheme.light.' + item.key"
                            [root]="true"
                          />
                        </p-fieldset>
                      }
                    </div>
                  </p-tabpanel>
                  <p-tabpanel value="dark">
                    <div class="flex flex-col gap-3 pt-3">
                      <p-fieldset legend="General">
                        <div class="grid grid-cols-4 gap-x-2 gap-y-3">
                          @for (item of darkPrimitivesArray(); track item.key) {
                            <design-token-field
                              [modelValue]="$any(item.value)"
                              (modelValueChange)="onTokenChange('colorScheme.dark.' + item.key, $event)"
                              [label]="camelCaseToSpaces(item.key)"
                            />
                          }
                        </div>
                      </p-fieldset>
                      @for (item of darkObjectsArray(); track item.key) {
                        <p-fieldset [legend]="capitalize(camelCaseToSpaces(item.key))">
                          <design-semantic-section
                            [path]="'colorScheme.dark.' + item.key"
                            [root]="true"
                          />
                        </p-fieldset>
                      }
                    </div>
                  </p-tabpanel>
                </p-tabpanels>
              </p-tabs>
            </div>
          </p-accordion-content>
        </p-accordion-panel>
      </p-accordion>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemanticEditor {
  protected readonly designerService = inject(ThemeDesignerService);

  protected readonly darkMode = signal(false);

  protected readonly activeSchemeTab = computed(() => (this.darkMode() ? 'dark' : 'light'));

  private readonly semantic = computed(() => {
    return this.designerService.designer().theme?.preset?.semantic as
      | Record<string, unknown>
      | undefined;
  });

  protected readonly commonTokens = computed<Record<string, unknown>>(() => {
    const sem = this.semantic();
    if (!sem) return {};
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(sem)) {
      if (key !== 'colorScheme') {
        result[key] = sem[key];
      }
    }
    return result;
  });

  protected readonly commonPrimitivesArray = computed<TokenEntry[]>(() => {
    const tokens = this.commonTokens();
    return Object.keys(tokens)
      .filter((key) => !this.isObject(tokens[key]))
      .map((key) => ({ key, value: tokens[key] }));
  });

  protected readonly commonObjectsArray = computed<TokenEntry[]>(() => {
    const tokens = this.commonTokens();
    return Object.keys(tokens)
      .filter((key) => this.isObject(tokens[key]))
      .sort((a, b) => this.semanticSortOrder(a) - this.semanticSortOrder(b))
      .map((key) => ({ key, value: tokens[key] }));
  });

  protected readonly lightTokens = computed<Record<string, unknown>>(() => {
    const sem = this.semantic();
    return (
      ((sem?.['colorScheme'] as Record<string, unknown>)?.['light'] as Record<string, unknown>) ??
      {}
    );
  });

  protected readonly lightPrimitivesArray = computed<TokenEntry[]>(() => {
    const tokens = this.lightTokens();
    return Object.keys(tokens)
      .filter((key) => !this.isObject(tokens[key]))
      .map((key) => ({ key, value: tokens[key] }));
  });

  protected readonly lightObjectsArray = computed<TokenEntry[]>(() => {
    const tokens = this.lightTokens();
    return Object.keys(tokens)
      .filter((key) => this.isObject(tokens[key]))
      .sort((a, b) => this.semanticSortOrder(a) - this.semanticSortOrder(b))
      .map((key) => ({ key, value: tokens[key] }));
  });

  protected readonly darkTokens = computed<Record<string, unknown>>(() => {
    const sem = this.semantic();
    return (
      ((sem?.['colorScheme'] as Record<string, unknown>)?.['dark'] as Record<string, unknown>) ?? {}
    );
  });

  protected readonly darkPrimitivesArray = computed<TokenEntry[]>(() => {
    const tokens = this.darkTokens();
    return Object.keys(tokens)
      .filter((key) => !this.isObject(tokens[key]))
      .map((key) => ({ key, value: tokens[key] }));
  });

  protected readonly darkObjectsArray = computed<TokenEntry[]>(() => {
    const tokens = this.darkTokens();
    return Object.keys(tokens)
      .filter((key) => this.isObject(tokens[key]))
      .sort((a, b) => this.semanticSortOrder(a) - this.semanticSortOrder(b))
      .map((key) => ({ key, value: tokens[key] }));
  });

  protected onTokenChange(fullPath: string, value: string | undefined): void {
    this.designerService.designer.update((prev) => {
      const cloned = structuredClone(prev);
      const semantic = cloned.theme!.preset.semantic as Record<string, unknown>;
      setObjectProperty(semantic, fullPath, value);
      return cloned;
    });
  }

  protected isObject(val: unknown): boolean {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }

  protected camelCaseToSpaces(val: string): string {
    return val.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }

  protected capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  protected onEnter(): void {
    this.designerService.applyTheme();
  }

  private semanticSortOrder(key: string): number {
    const idx = SEMANTIC_ORDER.indexOf(key);
    return idx === -1 ? SEMANTIC_ORDER.length : idx;
  }
}
