import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { Dialog } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { Tag } from 'primeng/tag';
import { Toast } from 'primeng/toast';

import { ThemeStateService } from '../services/theme-state.service';

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'steady';
}

interface AuditRow {
  component: string;
  icon: string;
  layer: string;
  status: 'Ready' | 'Review' | 'Updated';
  updated: string;
}

interface RangeOption {
  label: string;
  value: RangeKey;
}

type RangeKey = '30d' | '60d' | '90d';

interface CoverageSeries {
  labels: string[];
  values: number[];
}

const COVERAGE_SERIES: Record<RangeKey, CoverageSeries> = {
  '30d': {
    labels: ['Jun 22', 'Jun 27', 'Jul 2', 'Jul 7', 'Jul 12', 'Jul 17'],
    values: [71, 76, 80, 84, 89, 94],
  },
  '60d': {
    labels: ['May 20', 'May 30', 'Jun 9', 'Jun 19', 'Jun 29', 'Jul 9', 'Jul 19'],
    values: [54, 61, 67, 73, 81, 89, 98],
  },
  '90d': {
    labels: ['Apr 20', 'May 5', 'May 20', 'Jun 4', 'Jun 19', 'Jul 4', 'Jul 19'],
    values: [38, 47, 56, 64, 74, 87, 98],
  },
};

@Component({
  selector: 'app-live-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    Avatar,
    Button,
    ChartModule,
    Dialog,
    Select,
    TableModule,
    TabsModule,
    Tag,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './live-dashboard.html',
  styleUrl: './live-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveDashboard {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);

  protected readonly themeState = inject(ThemeStateService);
  protected readonly selectedRange = signal<RangeKey>('90d');
  protected readonly dataDialogVisible = signal(false);
  protected readonly chartData = signal<ChartData<'line'>>(this.createChartData());
  protected readonly chartOptions = signal<ChartOptions<'line'>>(this.createChartOptions());

  protected readonly quickColors = this.themeState.primaryColors.filter((color) =>
    ['emerald', 'orange', 'blue', 'violet', 'rose'].includes(color.name),
  );

  protected readonly rangeOptions: RangeOption[] = [
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 60 days', value: '60d' },
    { label: 'Last 90 days', value: '90d' },
  ];

  protected readonly kpis: KpiCard[] = [
    { label: 'Components styled', value: '92', change: '+8 this week', trend: 'up' },
    { label: 'Token coverage', value: '98%', change: '+14%', trend: 'up' },
    { label: 'Preset variants', value: '4', change: 'In sync', trend: 'steady' },
    { label: 'Manual overrides', value: '0', change: 'Fully semantic', trend: 'steady' },
  ];

  protected readonly auditRows: AuditRow[] = [
    {
      component: 'Button',
      icon: 'pi pi-stop',
      layer: 'Component',
      status: 'Ready',
      updated: '2 min ago',
    },
    {
      component: 'DataTable',
      icon: 'pi pi-table',
      layer: 'Semantic',
      status: 'Updated',
      updated: '18 min ago',
    },
    {
      component: 'Dialog',
      icon: 'pi pi-window-maximize',
      layer: 'Component',
      status: 'Review',
      updated: '1 hr ago',
    },
    {
      component: 'Select',
      icon: 'pi pi-chevron-down',
      layer: 'Primitive',
      status: 'Ready',
      updated: 'Today',
    },
    {
      component: 'Tabs',
      icon: 'pi pi-clone',
      layer: 'Semantic',
      status: 'Ready',
      updated: 'Today',
    },
  ];

  constructor() {
    const refreshChart = () => this.refreshChart();

    afterNextRender(refreshChart);
    this.document.addEventListener('theme-switcher-change', refreshChart);
    this.destroyRef.onDestroy(() => {
      this.document.removeEventListener('theme-switcher-change', refreshChart);
    });
  }

  protected setRange(range: RangeKey): void {
    this.selectedRange.set(range);
    this.refreshChart();
  }

  protected openDataDialog(): void {
    this.dataDialogVisible.set(true);
  }

  protected closeDataDialog(): void {
    this.dataDialogVisible.set(false);
  }

  protected exportSnapshot(): void {
    this.messageService.add({
      key: 'dashboard',
      severity: 'success',
      summary: 'Snapshot ready',
      detail: 'The themed preview has been prepared.',
      life: 2800,
    });
  }

  protected getStatusSeverity(status: AuditRow['status']): 'success' | 'warn' | 'info' {
    switch (status) {
      case 'Ready':
        return 'success';
      case 'Review':
        return 'warn';
      case 'Updated':
        return 'info';
    }
  }

  protected get currentSeries(): CoverageSeries {
    return COVERAGE_SERIES[this.selectedRange()];
  }

  private refreshChart(): void {
    this.chartData.set(this.createChartData());
    this.chartOptions.set(this.createChartOptions());
  }

  private createChartData(): ChartData<'line'> {
    const styles = getComputedStyle(this.document.documentElement);
    const primary = styles.getPropertyValue('--p-primary-color').trim() || '#10b981';
    const series = COVERAGE_SERIES[this.selectedRange()];

    return {
      labels: series.labels,
      datasets: [
        {
          label: 'Token coverage',
          data: series.values,
          fill: true,
          tension: 0.42,
          borderColor: primary,
          backgroundColor: this.withAlpha(primary, 0.12),
          pointBackgroundColor: primary,
          pointBorderColor: styles.getPropertyValue('--p-content-background').trim() || '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 2.5,
          pointHoverRadius: 5,
          pointHitRadius: 12,
          borderWidth: 2,
        },
      ],
    };
  }

  private createChartOptions(): ChartOptions<'line'> {
    const styles = getComputedStyle(this.document.documentElement);
    const mutedText = styles.getPropertyValue('--p-text-muted-color').trim() || '#6b7280';
    const borderColor =
      styles.getPropertyValue('--p-content-border-color').trim() || '#e5e7eb';

    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => ` ${context.parsed.y}% component coverage`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: mutedText,
            font: { size: 10 },
            maxRotation: 0,
          },
        },
        y: {
          min: 0,
          max: 100,
          border: { display: false },
          grid: {
            color: borderColor,
            lineWidth: 0.7,
          },
          ticks: {
            color: mutedText,
            font: { size: 10 },
            stepSize: 25,
            callback: (value) => `${value}%`,
          },
        },
      },
    };
  }

  private withAlpha(color: string, alpha: number): string {
    const hex = color.replace('#', '');

    if (hex.length === 6) {
      const red = parseInt(hex.slice(0, 2), 16);
      const green = parseInt(hex.slice(2, 4), 16);
      const blue = parseInt(hex.slice(4, 6), 16);
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }

    return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
  }
}
