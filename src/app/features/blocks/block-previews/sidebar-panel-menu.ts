import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { PanelMenu } from 'primeng/panelmenu';

import type { MenuItem } from 'primeng/api';

import { DashboardContent } from './dashboard-content';

@Component({
  selector: 'app-sidebar-panel-menu-preview',
  standalone: true,
  imports: [NgClass, PanelMenu, DashboardContent],
  template: `
    <div class="flex h-full relative">
      <nav
        class="w-56 shrink-0 bg-surface-0 border-r border-surface-200 overflow-y-auto"
        [ngClass]="{
          'max-sm:hidden': !sidebarOpen(),
          'max-sm:absolute max-sm:z-20 max-sm:h-full max-sm:shadow-lg': sidebarOpen(),
        }"
      >
        <div class="sm:hidden flex justify-end px-2 pt-2">
          <button
            class="w-6 h-6 rounded flex items-center justify-center text-surface-400
              hover:text-surface-600 hover:bg-surface-100"
            (click)="sidebarOpen.set(false)"
          >
            <i class="pi pi-times text-xs"></i>
          </button>
        </div>
        <div class="p-2">
          <p-panelmenu [model]="menuItems()" [multiple]="true" />
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
export class SidebarPanelMenuPreview {
  protected readonly sidebarOpen = signal(false);
  protected readonly menuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      items: [
        { label: 'Overview', icon: 'pi pi-chart-line' },
        { label: 'Stats', icon: 'pi pi-chart-bar' },
      ],
    },
    {
      label: 'Content',
      icon: 'pi pi-file',
      items: [
        { label: 'Articles', icon: 'pi pi-file-edit' },
        { label: 'Media', icon: 'pi pi-image' },
        { label: 'Categories', icon: 'pi pi-tags' },
      ],
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      items: [
        { label: 'List', icon: 'pi pi-list' },
        { label: 'Roles', icon: 'pi pi-shield' },
      ],
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
    },
  ]);
}
