import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Textarea } from 'primeng/textarea';

import { ThemeDesignerService } from '../services/theme-designer.service';

@Component({
  selector: 'design-editor-footer',
  standalone: true,
  imports: [Button, Dialog, Textarea],
  template: `
    <div class="flex justify-end gap-2">
      <p-button
        label="Download"
        icon="pi pi-download"
        severity="secondary"
        [outlined]="true"
        (click)="openDownloadDialog()"
      />
      <p-button label="Apply" icon="pi pi-check" (click)="apply()" />
    </div>

    <p-dialog
      header="Export Theme"
      [(visible)]="dialogVisible"
      [modal]="true"
      [style]="{ width: '36rem' }"
      [draggable]="false"
    >
      <div class="flex flex-col gap-4">
        <p class="text-sm text-muted-color m-0">
          Copy this token to share or import your theme later. You can also paste it into the Import
          section on the Create Theme page, or pass it as a
          <code
            class="text-xs px-1 py-0.5 rounded"
            style="background: var(--p-content-hover-background)"
            >?theme=</code
          >
          URL parameter.
        </p>
        <textarea
          pTextarea
          [value]="base64Value()"
          readonly
          rows="6"
          class="w-full text-xs font-mono break-all resize-none"
          (click)="selectAll($event)"
        ></textarea>
        <div class="flex justify-end gap-2">
          <p-button
            [label]="copied() ? 'Copied!' : 'Copy'"
            [icon]="copied() ? 'pi pi-check' : 'pi pi-copy'"
            severity="secondary"
            [outlined]="true"
            (click)="copyToClipboard()"
          />
          <p-button label="Download .ts File" icon="pi pi-file-export" (click)="downloadFile()" />
        </div>
      </div>
    </p-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorFooter {
  private readonly designerService = inject(ThemeDesignerService);

  protected readonly dialogVisible = signal(false);
  protected readonly base64Value = signal('');
  protected readonly copied = signal(false);

  protected openDownloadDialog(): void {
    this.base64Value.set(this.designerService.encodeTheme());
    this.copied.set(false);
    this.dialogVisible.set(true);
  }

  protected async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.base64Value());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // fallback: select the textarea text
    }
  }

  protected selectAll(event: Event): void {
    (event.target as HTMLTextAreaElement).select();
  }

  protected downloadFile(): void {
    this.designerService.downloadTheme();
  }

  protected apply(): void {
    this.designerService.applyTheme(true);
  }
}
