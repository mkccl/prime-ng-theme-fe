import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  template: `
    <div class="flex flex-col gap-4 h-full">
      <div>
        <h1 class="text-base font-semibold text-surface-800 m-0">Dashboard</h1>
        <p class="text-xs text-surface-400 mt-0.5 m-0">Welcome back, Jane</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        @for (stat of stats; track stat.label) {
          <div class="border border-surface-200 rounded-lg p-3">
            <div class="text-[0.65rem] text-surface-400 uppercase tracking-wide">
              {{ stat.label }}
            </div>
            <div class="text-lg font-bold text-surface-800 mt-1">{{ stat.value }}</div>
            <div class="text-xs mt-0.5" [class]="stat.up ? 'text-green-600' : 'text-red-500'">
              <i class="pi text-[0.6rem]" [class]="stat.up ? 'pi-arrow-up' : 'pi-arrow-down'"></i>
              {{ stat.change }}
            </div>
          </div>
        }
      </div>

      <div>
        <div class="text-xs font-semibold text-surface-500 uppercase tracking-wide mb-2">
          Recent Activity
        </div>
        @for (item of activity; track item.text) {
          <div class="flex items-center gap-3 py-2.5 border-b border-surface-100 last:border-b-0">
            <div
              class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
            >
              <i class="pi text-[0.65rem] text-primary" [class]="item.icon"></i>
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-sm text-surface-700 truncate">{{ item.text }}</div>
              <div class="text-[0.65rem] text-surface-400">{{ item.time }}</div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContent {
  protected readonly stats = [
    { label: 'Users', value: '2,847', change: '12.5%', up: true },
    { label: 'Revenue', value: '$48.2K', change: '8.2%', up: true },
    { label: 'Orders', value: '1,024', change: '3.1%', up: false },
    { label: 'Growth', value: '24.5%', change: '4.6%', up: true },
  ];

  protected readonly activity = [
    { icon: 'pi-user-plus', text: 'New user registered', time: '2 min ago' },
    { icon: 'pi-shopping-cart', text: 'Order #1234 placed', time: '15 min ago' },
    { icon: 'pi-check-circle', text: 'Task "Update docs" completed', time: '1 hr ago' },
    { icon: 'pi-comment', text: 'New comment on "Q4 Report"', time: '3 hrs ago' },
    { icon: 'pi-upload', text: 'design-v2.fig uploaded', time: '5 hrs ago' },
  ];
}
