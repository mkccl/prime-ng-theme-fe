import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

import { CodeBlock } from './code-block';

@Component({
  selector: 'app-code-dialog',
  standalone: true,
  imports: [Dialog, Tabs, TabList, Tab, TabPanels, TabPanel, CodeBlock],
  template: `
    <p-dialog
      [header]="name()"
      [(visible)]="visible"
      [modal]="true"
      [dismissableMask]="true"
      [style]="{ width: '56rem' }"
      [breakpoints]="{ '960px': '90vw' }"
    >
      <p-tabs [value]="0">
        <p-tablist>
          <p-tab [value]="0">HTML</p-tab>
          @if (tsCode()) {
            <p-tab [value]="1">TypeScript</p-tab>
          }
        </p-tablist>
        <p-tabpanels>
          <p-tabpanel [value]="0">
            <app-code-block [code]="htmlCode()" language="xml" />
          </p-tabpanel>
          @if (tsCode()) {
            <p-tabpanel [value]="1">
              <app-code-block [code]="tsCode()!" language="typescript" />
            </p-tabpanel>
          }
        </p-tabpanels>
      </p-tabs>
    </p-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeDialog {
  readonly visible = model(false);
  readonly name = input.required<string>();
  readonly htmlCode = input.required<string>();
  readonly tsCode = input<string>();
}
