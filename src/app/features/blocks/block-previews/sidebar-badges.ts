import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Badge } from 'primeng/badge';

import { DashboardContent } from './dashboard-content';

@Component({
  selector: 'app-sidebar-badges-preview',
  standalone: true,
  imports: [NgClass, Badge, DashboardContent],
  template: `
    <div class="flex h-full relative">
      <nav
        class="w-56 shrink-0 bg-surface-0 border-r border-surface-200 flex flex-col py-3"
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
        <div class="px-4 mb-2">
          <span class="text-xs font-semibold text-surface-400 uppercase tracking-wider"
            >Navigation</span
          >
        </div>
        @for (item of items(); track item.label) {
          <a
            class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
            [class]="
              item.active ? 'bg-primary/10 text-primary' : 'text-surface-600 hover:bg-surface-100'
            "
          >
            <i class="pi" [class]="item.icon"></i>
            <span class="flex-1">{{ item.label }}</span>
            @if (item.badge) {
              <p-badge [value]="item.badge" [severity]="item.severity" />
            }
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
export class SidebarBadgesPreview {
  protected readonly sidebarOpen = signal(false);
  protected readonly items = signal([
    { icon: 'pi-home', label: 'Dashboard', active: true, badge: null, severity: null },
    {
      icon: 'pi-inbox',
      label: 'Inbox',
      active: false,
      badge: '12',
      severity: 'danger' as const,
    },
    {
      icon: 'pi-bell',
      label: 'Notifications',
      active: false,
      badge: '3',
      severity: 'warn' as const,
    },
    { icon: 'pi-users', label: 'Team', active: false, badge: null, severity: null },
    {
      icon: 'pi-calendar',
      label: 'Events',
      active: false,
      badge: '5',
      severity: 'info' as const,
    },
    { icon: 'pi-cog', label: 'Settings', active: false, badge: null, severity: null },
  ]);
}
