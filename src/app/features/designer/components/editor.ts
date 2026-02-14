import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { ThemeDesignerService } from '../services/theme-designer.service';
import { PrimitiveColors } from './primitive-colors';
import { PrimitiveBorderRadius } from './primitive-border-radius';
import { SemanticEditor } from './semantic-editor';
import { ComponentEditor } from './component-editor';
import { CustomTokens } from './custom-tokens';
import { Settings } from './settings';

@Component({
  selector: 'design-editor',
  standalone: true,
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    PrimitiveColors,
    PrimitiveBorderRadius,
    SemanticEditor,
    ComponentEditor,
    CustomTokens,
    Settings,
  ],
  template: `
    <div (keydown.enter)="onEnter()">
      <p-tabs [value]="activeTab()" (valueChange)="onTabChange($event)">
        <p-tablist>
          <p-tab [value]="0">Primitive</p-tab>
          <p-tab [value]="1">Semantic</p-tab>
          <p-tab [value]="2">Component</p-tab>
          <p-tab [value]="3">Custom</p-tab>
          <p-tab [value]="4">Settings</p-tab>
        </p-tablist>
        <p-tabpanels>
          <p-tabpanel [value]="0">
            <div class="flex flex-col gap-3 pt-2">
              <design-primitive-border-radius />
              <design-primitive-colors />
            </div>
          </p-tabpanel>
          <p-tabpanel [value]="1">
            <design-semantic-editor />
          </p-tabpanel>
          <p-tabpanel [value]="2">
            <design-component-editor />
          </p-tabpanel>
          <p-tabpanel [value]="3">
            <design-custom-tokens />
          </p-tabpanel>
          <p-tabpanel [value]="4">
            <design-settings />
          </p-tabpanel>
        </p-tabpanels>
      </p-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignEditor {
  private readonly designerService = inject(ThemeDesignerService);

  protected readonly activeTab = computed(() => this.designerService.designer().activeTab);

  protected onTabChange(value: string | number | undefined): void {
    const tab = typeof value === 'number' ? value : 0;
    this.designerService.designer.update((prev) => ({ ...prev, activeTab: tab }));
  }

  protected onEnter(): void {
    this.designerService.applyTheme();
  }
}
