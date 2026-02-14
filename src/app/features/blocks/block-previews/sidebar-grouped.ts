import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { DashboardContent } from './dashboard-content';

@Component({
  selector: 'app-sidebar-grouped-preview',
  standalone: true,
  imports: [NgClass, DashboardContent],
  template: `
    <div class="flex h-full relative">
      <nav
        class="w-56 shrink-0 bg-surface-0 border-r border-surface-200 flex flex-col py-3
          overflow-y-auto"
        [ngClass]="{
          'max-sm:hidden': !sidebarOpen(),
          'max-sm:absolute max-sm:z-20 max-sm:h-full max-sm:shadow-lg': sidebarOpen(),
        }"
      >
        <div class="sm:hidden flex justify-end px-2 mb-1">
          <button
            class="w-6 h-6 rounded flex items-center justify-center text-surface-400
              hover:text-surface-600 hover:bg-surface-100"
            (click)="sidebarOpen.set(false)"
          >
            <i class="pi pi-times text-xs"></i>
          </button>
        </div>
        @for (group of groups(); track group.title) {
          <div class="px-4 pt-3 pb-1.5">
            <span class="text-[0.65rem] font-bold text-surface-400 uppercase tracking-widest">
              {{ group.title }}
            </span>
          </div>
          @for (item of group.items; track item.label) {
            <a
              class="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-colors"
              [class]="
                item.active ? 'bg-primary/10 text-primary' : 'text-surface-600 hover:bg-surface-100'
              "
            >
              <i class="pi" [class]="item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          }
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
export class SidebarGroupedPreview {
  protected readonly sidebarOpen = signal(false);
  protected readonly groups = signal([
    {
      title: 'Main',
      items: [
        { icon: 'pi-home', label: 'Dashboard', active: true },
        { icon: 'pi-inbox', label: 'Messages', active: false },
        { icon: 'pi-calendar', label: 'Schedule', active: false },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: 'pi-user', label: 'Profile', active: false },
        { icon: 'pi-lock', label: 'Security', active: false },
        { icon: 'pi-bell', label: 'Notifications', active: false },
      ],
    },
  ]);
}
