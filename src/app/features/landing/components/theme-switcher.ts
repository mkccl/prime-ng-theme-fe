import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Popover } from 'primeng/popover';
import { ToggleSwitch } from 'primeng/toggleswitch';

import { ThemeStateService } from '../services/theme-state.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [FormsModule, Popover, ToggleSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="switcher-trigger" title="Theme settings" (click)="op.toggle($event)">
      <i class="pi pi-cog"></i>
    </button>

    <p-popover #op>
      <div class="switcher-panel">
        <section>
          <span class="switcher-label">Primary</span>
          <div class="switcher-grid">
            @for (c of themeState.primaryColors; track c.name) {
              <button
                class="switcher-swatch"
                [class.switcher-swatch-selected]="themeState.selectedPrimary() === c.name"
                [style.backgroundColor]="c.color"
                [title]="c.name"
                (click)="themeState.setPrimary(c.name)"
              ></button>
            }
          </div>
        </section>

        <section>
          <span class="switcher-label">Surface</span>
          <div class="switcher-row">
            @for (c of themeState.surfaceColors; track c.name) {
              <button
                class="switcher-swatch"
                [class.switcher-swatch-selected]="themeState.selectedSurface() === c.name"
                [style.backgroundColor]="c.color"
                [title]="c.name"
                (click)="themeState.setSurface(c.name)"
              ></button>
            }
          </div>
        </section>

        <section>
          <span class="switcher-label">Preset</span>
          <div class="switcher-presets">
            @for (p of themeState.presetOptions; track p) {
              <button
                class="switcher-preset-btn"
                [class.switcher-preset-active]="themeState.selectedPreset() === p"
                (click)="themeState.setPreset(p)"
              >
                {{ p }}
              </button>
            }
          </div>
        </section>

        <div class="switcher-toggles">
          <div class="switcher-toggle-row">
            <span class="switcher-toggle-label">Dark Mode</span>
            <p-toggleswitch
              [ngModel]="themeState.isDark()"
              (ngModelChange)="themeState.toggleDark()"
            />
          </div>
          <div class="switcher-toggle-row">
            <span class="switcher-toggle-label">Ripple</span>
            <p-toggleswitch
              [(ngModel)]="ripple"
              (ngModelChange)="themeState.toggleRipple(ripple())"
            />
          </div>
          <div class="switcher-toggle-row">
            <span class="switcher-toggle-label">RTL</span>
            <p-toggleswitch [(ngModel)]="rtl" (ngModelChange)="themeState.toggleRtl(rtl())" />
          </div>
        </div>
      </div>
    </p-popover>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .switcher-trigger {
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: none;
      border: none;
      color: var(--p-text-color);
      cursor: pointer;
    }

    .switcher-trigger:hover {
      background: var(--p-content-hover-background);
    }

    .switcher-panel {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 280px;
    }

    .switcher-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--p-text-muted-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .switcher-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    }

    .switcher-row {
      display: flex;
      gap: 0.375rem;
    }

    .switcher-swatch {
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      outline: none;
      transition: box-shadow 0.15s;
    }

    .switcher-swatch:hover {
      box-shadow:
        0 0 0 2px var(--p-content-background),
        0 0 0 4px var(--p-text-muted-color);
    }

    .switcher-swatch-selected {
      box-shadow:
        0 0 0 2px var(--p-content-background),
        0 0 0 4px var(--p-primary-color);
    }

    .switcher-presets {
      display: flex;
      gap: 0.375rem;
    }

    .switcher-preset-btn {
      flex: 1;
      padding: 0.375rem 0.5rem;
      font-size: 0.8125rem;
      border: 1px solid var(--p-content-border-color);
      border-radius: 0.5rem;
      background: var(--p-content-background);
      color: var(--p-text-color);
      cursor: pointer;
    }

    .switcher-preset-btn:hover {
      background: var(--p-content-hover-background);
    }

    .switcher-preset-active {
      background: var(--p-primary-color);
      color: var(--p-primary-contrast-color);
      border-color: var(--p-primary-color);
    }

    .switcher-preset-active:hover {
      background: var(--p-primary-color);
    }

    .switcher-toggles {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      border-top: 1px solid var(--p-content-border-color);
      padding-top: 0.75rem;
    }

    .switcher-toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .switcher-toggle-label {
      font-size: 0.8125rem;
      color: var(--p-text-color);
    }
  `,
})
export class ThemeSwitcher {
  protected readonly themeState = inject(ThemeStateService);
  protected readonly ripple = signal(false);
  protected readonly rtl = signal(false);
}
