import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('typescript', typescript);

@Component({
  selector: 'app-code-block',
  standalone: true,
  template: `
    <div class="relative">
      <pre
        class="m-0 p-4 rounded-lg bg-surface-50 border border-surface-200 text-xs font-mono
          overflow-auto max-h-[480px]"
      ><code [innerHTML]="highlighted()"></code></pre>
      <button
        type="button"
        (click)="copyCode()"
        class="absolute top-2 right-2 px-3 py-1.5 text-xs border border-surface-300 rounded-lg
          bg-surface-0 hover:bg-surface-100 transition-colors"
      >
        <i class="pi mr-1" [class.pi-copy]="!copied()" [class.pi-check]="copied()"></i>
        {{ copied() ? 'Copied!' : 'Copy' }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlock {
  private readonly sanitizer = inject(DomSanitizer);

  readonly code = input.required<string>();
  readonly language = input<string>('xml');

  protected readonly copied = signal(false);

  protected readonly highlighted = computed(() => {
    const result = hljs.highlight(this.code(), { language: this.language() });
    return this.sanitizer.bypassSecurityTrustHtml(result.value);
  });

  protected async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // fallback: user can manually select text
    }
  }
}
