import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { DashboardContent } from './dashboard-content';

@Component({
  selector: 'app-sidebar-header-footer-preview',
  standalone: true,
  imports: [NgClass, DashboardContent],
  template: `
    <div class="flex h-full relative">
      <nav
        class="w-56 shrink-0 bg-surface-0 border-r border-surface-200 flex flex-col"
        [ngClass]="{
          'max-sm:hidden': !sidebarOpen(),
          'max-sm:absolute max-sm:z-20 max-sm:h-full max-sm:shadow-lg': sidebarOpen(),
        }"
      >
        <div class="flex items-center gap-2 px-4 py-3 border-b border-surface-200">
          <div class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <i class="pi pi-bolt text-xs text-primary-contrast"></i>
          </div>
          <span class="text-sm font-bold text-surface-800 flex-1">Acme App</span>
          <button
            class="sm:hidden w-6 h-6 rounded flex items-center justify-center text-surface-400
              hover:text-surface-600 hover:bg-surface-100"
            (click)="sidebarOpen.set(false)"
          >
            <i class="pi pi-times text-xs"></i>
          </button>
        </div>
        <div class="flex-1 py-2 overflow-y-auto">
          @for (item of items(); track item.label) {
            <a
              class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
              [class]="
                item.active ? 'bg-primary/10 text-primary' : 'text-surface-600 hover:bg-surface-100'
              "
            >
              <i class="pi" [class]="item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          }
        </div>
        <div
          class="px-4 py-3 border-t border-surface-200 text-[0.65rem] text-surface-400 text-center"
        >
          Acme App v2.4.1
        </div>
      </nav>
      <div class="flex-1 bg-surface-50 p-4 min-w-0 overflow-y-auto">
        @if (!sidebarOpen()) {
          <button
            class="sm:hidden mb-3 w-8 h-8 rounded-lg bg-surface-0 border border-surface-200 flex
              items-center justify-center text-surface-600 hover:bg-surface-100"
            (click)="sidebarOpen.set(true)"
          >
            <i class="pi pi-bars text-sm"></i>
          </button>
        }
        <app-dashboard-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarHeaderFooterPreview {
  protected readonly sidebarOpen = signal(false);
  protected readonly items = signal([
    { icon: 'pi-home', label: 'Dashboard', active: true },
    { icon: 'pi-inbox', label: 'Messages', active: false },
    { icon: 'pi-folder', label: 'Projects', active: false },
    { icon: 'pi-chart-bar', label: 'Analytics', active: false },
    { icon: 'pi-cog', label: 'Settings', active: false },
    { icon: 'pi-question-circle', label: 'Help', active: false },
  ]);
}
