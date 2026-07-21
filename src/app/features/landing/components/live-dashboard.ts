import { DOCUMENT } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';

import { ChartData, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';

type Period = 'Weekly' | 'Monthly' | 'Yearly';

interface Transaction {
  icon: string;
  label: string;
  date: string;
  amount: string;
  kind: 'income' | 'expense';
}

@Component({
  selector: 'app-live-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './live-dashboard.html',
  styleUrl: './live-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveDashboard {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly period = signal<Period>('Weekly');
  protected readonly activeNav = signal('Overview');
  protected readonly chartData = signal<ChartData<'bar'>>(this.createChartData());
  protected readonly chartOptions = signal<ChartOptions<'bar'>>(this.createChartOptions());

  protected readonly transactions: Transaction[] = [
    { icon: 'pi pi-shopping-cart', label: 'Amazon', date: 'Jul 18, 2026', amount: '-$125.00', kind: 'expense' },
    { icon: 'pi pi-briefcase', label: 'Freelance', date: 'Jul 17, 2026', amount: '+$1,500.00', kind: 'income' },
    { icon: 'pi pi-car', label: 'Uber', date: 'Jul 16, 2026', amount: '-$24.50', kind: 'expense' },
    { icon: 'pi pi-bolt', label: 'Utilities', date: 'Jul 15, 2026', amount: '-$96.20', kind: 'expense' },
  ];

  constructor() {
    const refresh = () => {
      this.chartData.set(this.createChartData());
      this.chartOptions.set(this.createChartOptions());
    };
    afterNextRender(refresh);
    this.document.addEventListener('theme-switcher-change', refresh);
    this.destroyRef.onDestroy(() => this.document.removeEventListener('theme-switcher-change', refresh));
  }

  protected setPeriod(period: Period): void {
    this.period.set(period);
    this.chartData.set(this.createChartData());
  }

  private createChartData(): ChartData<'bar'> {
    const styles = getComputedStyle(this.document.documentElement);
    const primary = styles.getPropertyValue('--p-primary-color').trim() || '#0f172a';
    const middle = styles.getPropertyValue('--p-surface-400').trim() || '#94a3b8';
    const muted = styles.getPropertyValue('--p-surface-200').trim() || '#e2e8f0';
    const factor = this.period() === 'Weekly' ? 1 : this.period() === 'Monthly' ? 1.18 : 1.32;
    return {
      labels: ['Jun 11', 'Jun 12', 'Jun 13', 'Jun 14', 'Jun 15', 'Jun 16', 'Jun 17', 'Jun 18', 'Jun 19', 'Jun 20'],
      datasets: [
        {
          label: 'Personal Wallet',
          data: [4200, 8900, 13500, 6100, 14200, 6900, 10700, 12600, 15100, 10800].map((value) => Math.round(value * factor)),
          backgroundColor: primary,
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.55,
          categoryPercentage: 0.7,
        },
        {
          label: 'Corporate Wallet',
          data: [3200, 7600, 3900, 8800, 5100, 6200, 7300, 4300, 6800, 2700].map((value) => Math.round(value * factor)),
          backgroundColor: middle,
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.55,
          categoryPercentage: 0.7,
        },
        {
          label: 'Investment Wallet',
          data: [2100, 4800, 3900, 2700, 2300, 3400, 5600, 3700, 4100, 1800].map((value) => Math.round(value * factor)),
          backgroundColor: muted,
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.55,
          categoryPercentage: 0.7,
        },
      ],
    };
  }

  private createChartOptions(): ChartOptions<'bar'> {
    const styles = getComputedStyle(this.document.documentElement);
    const mutedText = styles.getPropertyValue('--p-text-muted-color').trim() || '#64748b';
    const border = styles.getPropertyValue('--p-content-border-color').trim() || '#e2e8f0';
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { color: mutedText, font: { size: 10 } } },
        y: { stacked: true, beginAtZero: true, max: 30000, grid: { color: border }, border: { display: false }, ticks: { color: mutedText, font: { size: 10 }, callback: (value) => Number(value).toLocaleString('en-US') } },
      },
    };
  }
}
