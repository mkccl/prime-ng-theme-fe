import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fieldset } from 'primeng/fieldset';
import { Select } from 'primeng/select';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { ComponentSection } from './component-section';

interface ComponentOption {
  label: string;
  value: string;
}

function capitalize(str: string): string {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

@Component({
  selector: 'design-component-editor',
  standalone: true,
  imports: [
    FormsModule,
    Fieldset,
    Select,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ComponentSection,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <p-select
        [options]="componentOptions()"
        [(ngModel)]="selectedComponent"
        optionLabel="label"
        optionValue="value"
        placeholder="Select a component"
        [filter]="true"
        filterBy="label"
        styleClass="w-full"
      />

      @if (selectedComponent() && tokens()) {
        <div class="text-lg font-semibold capitalize">{{ selectedComponent() }}</div>

        <p-fieldset legend="Common" [toggleable]="true">
          @if (hasCommonTokens()) {
            @for (entry of commonKeys(); track entry) {
              <design-component-section [componentKey]="selectedComponent()!" [path]="entry" />
            }
          } @else {
            <span class="text-[var(--p-text-muted-color)]">No common design tokens</span>
          }
        </p-fieldset>

        <p-fieldset legend="Color Scheme" [toggleable]="true">
          @if (hasColorScheme()) {
            <p-tabs [value]="0">
              <p-tablist>
                <p-tab [value]="0">Light</p-tab>
                <p-tab [value]="1">Dark</p-tab>
              </p-tablist>
              <p-tabpanels>
                <p-tabpanel [value]="0">
                  @for (entry of lightKeys(); track entry) {
                    <design-component-section
                      [componentKey]="selectedComponent()!"
                      [path]="'colorScheme.light.' + entry"
                    />
                  }
                </p-tabpanel>
                <p-tabpanel [value]="1">
                  @for (entry of darkKeys(); track entry) {
                    <design-component-section
                      [componentKey]="selectedComponent()!"
                      [path]="'colorScheme.dark.' + entry"
                    />
                  }
                </p-tabpanel>
              </p-tabpanels>
            </p-tabs>
          } @else {
            <span class="text-[var(--p-text-muted-color)]">No color scheme tokens</span>
          }
        </p-fieldset>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentEditor {
  private readonly designerService = inject(ThemeDesignerService);

  protected readonly selectedComponent = signal<string | null>(null);

  private readonly preset = computed(() => this.designerService.designer().theme!.preset);

  protected readonly componentOptions = computed<ComponentOption[]>(() => {
    const components = this.preset().components;
    if (!components) {
      return [];
    }
    return Object.keys(components)
      .sort()
      .map((key) => ({ label: capitalize(key), value: key }));
  });

  protected readonly tokens = computed(() => {
    const key = this.selectedComponent();
    if (!key) {
      return undefined;
    }
    return this.preset().components[key] as Record<string, unknown> | undefined;
  });

  protected readonly commonKeys = computed<string[]>(() => {
    const t = this.tokens();
    if (!t) {
      return [];
    }
    return Object.keys(t).filter((k) => k !== 'colorScheme' && k !== 'css');
  });

  protected readonly hasCommonTokens = computed(() => this.commonKeys().length > 0);

  protected readonly hasColorScheme = computed(() => {
    const t = this.tokens();
    return t != null && typeof t['colorScheme'] === 'object' && t['colorScheme'] !== null;
  });

  protected readonly lightKeys = computed<string[]>(() => {
    const cs = this.tokens()?.['colorScheme'] as Record<string, unknown> | undefined;
    const light = cs?.['light'] as Record<string, unknown> | undefined;
    return light ? Object.keys(light) : [];
  });

  protected readonly darkKeys = computed<string[]>(() => {
    const cs = this.tokens()?.['colorScheme'] as Record<string, unknown> | undefined;
    const dark = cs?.['dark'] as Record<string, unknown> | undefined;
    return dark ? Object.keys(dark) : [];
  });
}
