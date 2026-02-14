import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Avatar } from 'primeng/avatar';

import { DashboardContent } from './dashboard-content';

@Component({
  selector: 'app-sidebar-avatar-profile-preview',
  standalone: true,
  imports: [NgClass, Avatar, DashboardContent],
  template: `
    <div class="flex h-full relative">
      <nav
        class="w-56 shrink-0 bg-surface-0 border-r border-surface-200 flex flex-col"
        [ngClass]="{
          'max-sm:hidden': !sidebarOpen(),
          'max-sm:absolute max-sm:z-20 max-sm:h-full max-sm:shadow-lg': sidebarOpen(),
        }"
      >
        <div class="flex items-center gap-3 p-4 border-b border-surface-200">
          <p-avatar
            label="JD"
            shape="circle"
            [style]="{
              'background-color': 'var(--p-primary-color)',
              color: 'var(--p-primary-contrast-color)',
            }"
          />
          <div class="min-w-0 flex-1">
            <div class="text-sm font-semibold text-surface-800 truncate">Jane Doe</div>
            <div class="text-xs text-surface-400 truncate">Product Designer</div>
          </div>
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
        <div class="p-3 border-t border-surface-200">
          <a
            class="flex items-center gap-3 px-2 py-2 text-sm text-surface-500 hover:bg-surface-100
              rounded-lg cursor-pointer transition-colors"
          >
            <i class="pi pi-sign-out"></i>
            <span>Sign Out</span>
          </a>
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
export class SidebarAvatarProfilePreview {
  protected readonly sidebarOpen = signal(false);
  protected readonly items = signal([
    { icon: 'pi-home', label: 'Dashboard', active: true },
    { icon: 'pi-folder', label: 'Projects', active: false },
    { icon: 'pi-users', label: 'Team', active: false },
    { icon: 'pi-chart-bar', label: 'Reports', active: false },
    { icon: 'pi-cog', label: 'Settings', active: false },
  ]);
}
