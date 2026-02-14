import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { type ThemeState } from '../../landing/services/theme-state.service';
import { BlockDefinition } from '../models/block-definition';
import { CodeDialog } from './code-dialog';

@Component({
  selector: 'app-block-card',
  standalone: true,
  imports: [CodeDialog],
  templateUrl: './block-card.html',
  styleUrl: './block-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockCard {
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);

  readonly block = input.required<BlockDefinition>();

  protected readonly containerWidth = signal<number | null>(null);
  protected readonly isDragging = signal(false);
  protected readonly dialogVisible = signal(false);
  protected readonly stage = viewChild<ElementRef<HTMLElement>>('stage');
  protected readonly previewUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl('/blocks/preview/' + this.block().id),
  );

  private startX = 0;
  private startWidth = 0;

  constructor() {
    afterNextRender(() => {
      const onMouseMove = (e: MouseEvent) => this.onMouseMove(e);
      const onMouseUp = () => this.onMouseUp();
      const onMessage = (e: MessageEvent) => this.onMessage(e);
      const onThemeChange = (e: Event) =>
        this.sendThemeToIframe((e as CustomEvent<ThemeState>).detail);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      window.addEventListener('message', onMessage);
      document.addEventListener('theme-switcher-change', onThemeChange);

      this.destroyRef.onDestroy(() => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('message', onMessage);
        document.removeEventListener('theme-switcher-change', onThemeChange);
      });
    });
  }

  protected onResizeStart(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
    this.startX = event.clientX;
    const wrapper = (event.target as HTMLElement).closest(
      '.block-card-preview-wrapper',
    ) as HTMLElement;
    this.startWidth = wrapper.offsetWidth;
  }

  protected openCodeDialog(): void {
    this.dialogVisible.set(true);
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging()) return;
    const delta = event.clientX - this.startX;
    const stageEl = this.stage()?.nativeElement;
    const maxWidth = stageEl ? stageEl.clientWidth - 48 : Infinity;
    const newWidth = Math.max(200, Math.min(this.startWidth + delta, maxWidth));
    this.containerWidth.set(newWidth);
  }

  private onMouseUp(): void {
    this.isDragging.set(false);
  }

  private onMessage(event: MessageEvent): void {
    if (event.data?.type !== 'theme-state-request') return;
    const iframe = this.stage()?.nativeElement.querySelector('iframe');
    if (iframe?.contentWindow && event.source === iframe.contentWindow) {
      const stored = (document as any).__themeState as ThemeState | undefined;
      const state: ThemeState = stored ?? {
        primary: 'emerald',
        surface: 'slate',
        preset: 'Aura',
        isDark: document.documentElement.classList.contains('p-dark'),
      };
      iframe.contentWindow.postMessage({ type: 'theme-change', ...state }, '*');
    }
  }

  private sendThemeToIframe(state: ThemeState): void {
    const iframe = this.stage()?.nativeElement.querySelector('iframe');
    iframe?.contentWindow?.postMessage({ type: 'theme-change', ...state }, '*');
  }
}
