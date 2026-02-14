import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { DashboardContent } from './dashboard-content';

@Component({
  selector: 'app-sidebar-icons-only-preview',
  standalone: true,
  imports: [NgClass, DashboardContent],
  template: `
    <div class="flex h-full relative">
      <nav
        class="w-16 shrink-0 bg-surface-0 border-r border-surface-200 flex flex-col items-center
          py-4 gap-1"
        [ngClass]="{
          'max-sm:hidden': !sidebarOpen(),
          'max-sm:absolute max-sm:z-20 max-sm:h-full max-sm:shadow-lg': sidebarOpen(),
        }"
      >
        <button
          class="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center text-surface-400
            hover:text-surface-600 hover:bg-surface-100"
          (click)="sidebarOpen.set(false)"
        >
          <i class="pi pi-times text-sm"></i>
        </button>
        <div
          class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-contrast
            mb-4"
        >
          <i class="pi pi-bolt text-sm"></i>
        </div>
        @for (item of items(); track item.icon) {
          <a
            class="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer
              transition-colors"
            [class]="
              item.active
                ? 'bg-primary/10 text-primary'
                : 'text-surface-500 hover:bg-surface-100 hover:text-surface-700'
            "
          >
            <i class="pi" [class]="item.icon"></i>
          </a>
        }
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
export class SidebarIconsOnlyPreview {
  protected readonly sidebarOpen = signal(false);
  protected readonly items = signal([
    { icon: 'pi-home', active: true },
    { icon: 'pi-inbox', active: false },
    { icon: 'pi-calendar', active: false },
    { icon: 'pi-chart-bar', active: false },
    { icon: 'pi-cog', active: false },
  ]);
}
