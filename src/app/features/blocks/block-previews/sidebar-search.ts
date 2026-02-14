import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

import { DashboardContent } from './dashboard-content';

@Component({
  selector: 'app-sidebar-search-preview',
  standalone: true,
  imports: [NgClass, FormsModule, InputText, DashboardContent],
  template: `
    <div class="flex h-full relative">
      <nav
        class="w-56 shrink-0 bg-surface-0 border-r border-surface-200 flex flex-col"
        [ngClass]="{
          'max-sm:hidden': !sidebarOpen(),
          'max-sm:absolute max-sm:z-20 max-sm:h-full max-sm:shadow-lg': sidebarOpen(),
        }"
      >
        <div class="flex items-center gap-2 p-3">
          <span class="p-input-icon-left flex-1">
            <i class="pi pi-search text-xs"></i>
            <input
              pInputText
              type="text"
              placeholder="Search..."
              class="w-full text-sm"
              [ngModel]="query()"
              (ngModelChange)="query.set($event)"
            />
          </span>
          <button
            class="sm:hidden w-8 h-8 shrink-0 rounded flex items-center justify-center
              text-surface-400 hover:text-surface-600 hover:bg-surface-100"
            (click)="sidebarOpen.set(false)"
          >
            <i class="pi pi-times text-xs"></i>
          </button>
        </div>
        <div class="flex-1 py-1 overflow-y-auto">
          @for (item of filteredItems(); track item.label) {
            <a
              class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
              [class]="
                item.active ? 'bg-primary/10 text-primary' : 'text-surface-600 hover:bg-surface-100'
              "
            >
              <i class="pi" [class]="item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          } @empty {
            <div class="px-4 py-3 text-xs text-surface-400">No results found</div>
          }
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
export class SidebarSearchPreview {
  protected readonly sidebarOpen = signal(false);
  protected readonly query = signal('');

  private readonly allItems = signal([
    { icon: 'pi-home', label: 'Dashboard', active: true },
    { icon: 'pi-inbox', label: 'Inbox', active: false },
    { icon: 'pi-calendar', label: 'Calendar', active: false },
    { icon: 'pi-chart-bar', label: 'Analytics', active: false },
    { icon: 'pi-users', label: 'Team', active: false },
    { icon: 'pi-cog', label: 'Settings', active: false },
  ]);

  protected readonly filteredItems = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return this.allItems();
    return this.allItems().filter((item) => item.label.toLowerCase().includes(q));
  });
}
