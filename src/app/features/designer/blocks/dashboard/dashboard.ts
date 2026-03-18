import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { AvatarModule } from 'primeng/avatar';
import { Card } from 'primeng/card';
import { Drawer } from 'primeng/drawer';
import { ChartModule } from 'primeng/chart';
import { MultiSelect } from 'primeng/multiselect';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Dialog } from 'primeng/dialog';
import { InputNumber } from 'primeng/inputnumber';
import { Tooltip } from 'primeng/tooltip';

export interface Column {
  field: string;
  header: string;
  sortable: boolean;
  style: string;
}

export interface ActivityItem {
  id: string;
  code: string;
  category: string;
  type: string;
  status: string;
  time: string;
  icon: string;
  iconColor: string;
}

export interface ActivityGroup {
  department: string;
  items: ActivityItem[];
}

export interface Record {
  code: string;
  department: string;
  category: string;
  type: string;
  status: string;
  quantity: number;
  rating: number;
  value: number;
  assignee: string | null;
}

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
}

interface NavItem {
  label: string;
  icon: string;
  active: boolean;
}

interface RecentDocument {
  name: string;
  ext: string;
  icon: string;
  size: string;
}

@Component({
  selector: 'app-dashboard-block',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    Button,
    Tag,
    TabsModule,
    AvatarModule,
    Card,
    Drawer,
    ChartModule,
    MultiSelect,
    ConfirmDialog,
    InputText,
    IconField,
    InputIcon,
    Dialog,
    InputNumber,
    Tooltip,
  ],
  providers: [ConfirmationService],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBlock implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);

  protected sidebarVisible = false;

  protected readonly viewDialogVisible = signal(false);
  protected readonly editDialogVisible = signal(false);
  protected readonly createDialogVisible = signal(false);
  protected readonly selectedRecord = signal<Record | null>(null);
  protected editForm!: FormGroup;
  protected createForm!: FormGroup;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected readonly chartData = signal<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected readonly chartOptions = signal<any>(null);

  protected readonly recentDocuments = signal<RecentDocument[]>([
    { name: 'project_overview.docx', ext: 'docx', icon: 'word.svg', size: '214 KB' },
    { name: 'quarterly_report.xlsx', ext: 'xlsx', icon: 'excel.svg', size: '87 KB' },
    { name: 'budget_forecast.xlsx', ext: 'xlsx', icon: 'excel.svg', size: '341 KB' },
    { name: 'brand_guidelines.psd', ext: 'psd', icon: 'ps.svg', size: '1.2 MB' },
    { name: 'analytics_script.js', ext: 'js', icon: 'code.svg', size: '18 KB' },
    { name: 'infographic_draft.ai', ext: 'ai', icon: 'ai.svg', size: '526 KB' },
    { name: 'onboarding_guide.docx', ext: 'docx', icon: 'word.svg', size: '158 KB' },
    { name: 'meeting_notes.one', ext: 'one', icon: 'one.svg', size: '73 KB' },
    { name: 'theme_variables.css', ext: 'css', icon: 'code.svg', size: '9 KB' },
    { name: 'compliance_checklist.docx', ext: 'docx', icon: 'word.svg', size: '302 KB' },
  ]);

  enumValidator(allowedValues: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return allowedValues.includes(control.value)
        ? null
        : { invalidEnum: { value: control.value, allowed: allowedValues } };
    };
  }

  ngOnInit(): void {
    this.initChart();
    const recordFormConfig = {
      code: ['', [Validators.required, Validators.pattern(/^REC-\d{3}$/)]],
      department: ['', Validators.required],
      category: [
        '',
        [
          Validators.required,
          this.enumValidator([
            'Widget A',
            'Widget B',
            'Component X',
            'Component Y',
            'Module Alpha',
            'Module Beta',
            'Service Pack',
          ]),
        ],
      ],
      type: ['', Validators.required],
      status: ['', Validators.required],
      quantity: [null as number | null, [Validators.required, Validators.min(0)]],
      rating: [null as number | null, [Validators.required, Validators.min(0)]],
      value: [null as number | null, [Validators.required, Validators.min(0)]],
      assignee: [null as string | null],
    };
    this.editForm = this.fb.group(recordFormConfig);
    this.createForm = this.fb.group(recordFormConfig);
  }

  private initChart(): void {
    const style = getComputedStyle(this.document.documentElement);
    const primary = style.getPropertyValue('--p-primary-color').trim() || '#10b981';
    const mutedText = style.getPropertyValue('--p-text-muted-color').trim() || '#6b7280';
    const borderColor = style.getPropertyValue('--p-content-border-color').trim() || '#e5e7eb';

    this.chartData.set({
      labels: [
        'Jan 1',
        'Jan 15',
        'Feb 1',
        'Feb 15',
        'Mar 1',
        'Mar 15',
        'Apr 1',
        'Apr 15',
        'May 1',
      ],
      datasets: [
        {
          label: 'Category A',
          data: [32, 48, 41, 64, 52, 80, 46, 72, 60],
          fill: true,
          tension: 0.4,
          borderColor: primary,
          backgroundColor: this.hexToRgba(primary, 0.12),
          pointBackgroundColor: primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 1.5,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 2,
        },
        {
          label: 'Category B',
          data: [18, 28, 24, 40, 34, 55, 30, 48, 38],
          fill: true,
          tension: 0.4,
          borderColor: primary,
          borderDash: [5, 3],
          backgroundColor: this.hexToRgba(primary, 0.05),
          pointBackgroundColor: primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 1.5,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 1.5,
          borderOpacity: 0.5,
        },
      ],
    });

    this.chartOptions.set({
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
            label: (ctx: { dataset: { label: string }; parsed: { y: number } }) =>
              ` ${ctx.dataset.label}: ${ctx.parsed.y} units`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: mutedText,
            font: { size: 9 },
            maxRotation: 0,
          },
        },
        y: {
          grid: {
            color: borderColor,
            lineWidth: 0.8,
          },
          border: { display: false, dash: [4, 4] },
          ticks: {
            color: mutedText,
            font: { size: 9 },
            stepSize: 20,
          },
          beginAtZero: true,
          max: 100,
        },
      },
    });
  }

  private hexToRgba(color: string, alpha: number): string {
    const hex = color.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
    return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
  }

  protected readonly kpiCards = signal<KpiCard[]>([
    {
      label: 'Total Records',
      value: '12,450',
      change: '+8.3%',
      trend: 'up',
      description: 'Growth this quarter',
    },
    {
      label: 'Active Items',
      value: '342',
      change: '-5.2%',
      trend: 'down',
      description: 'Decrease in current period',
    },
    {
      label: 'Avg. Rating',
      value: '18.4',
      change: '+12.5%',
      trend: 'up',
      description: 'High retention rate',
    },
    {
      label: 'Avg. Output',
      value: '45.8 units',
      change: '+4.5%',
      trend: 'up',
      description: 'Steady growth',
    },
  ]);

  protected readonly navItems = signal<NavItem[]>([
    { label: 'Dashboard', icon: 'pi pi-home', active: true },
    { label: 'Lifecycle', icon: 'pi pi-refresh', active: false },
    { label: 'Analytics', icon: 'pi pi-chart-bar', active: false },
    { label: 'Projects', icon: 'pi pi-folder', active: false },
    { label: 'Team', icon: 'pi pi-users', active: false },
  ]);

  protected readonly secondaryNavItems = signal<NavItem[]>([
    { label: 'Departments', icon: 'pi pi-map-marker', active: false },
    { label: 'Records', icon: 'pi pi-th-large', active: true },
    { label: 'Reports', icon: 'pi pi-file-pdf', active: false },
    { label: 'AI Assistant', icon: 'pi pi-bolt', active: false },
    { label: 'More', icon: 'pi pi-ellipsis-h', active: false },
  ]);

  protected readonly records = signal<Record[]>([
    {
      code: 'REC-001',
      department: 'Operations',
      category: 'Widget A',
      type: 'Audit',
      status: 'In Progress',
      quantity: 4,
      rating: 12.3,
      value: 18,
      assignee: 'Alice Smith',
    },
    {
      code: 'REC-002',
      department: 'Operations',
      category: 'Widget B',
      type: 'Audit',
      status: 'Completed',
      quantity: 6,
      rating: 18.7,
      value: 29,
      assignee: 'Alice Smith',
    },
    {
      code: 'REC-003',
      department: 'Engineering',
      category: 'Component X',
      type: 'Review',
      status: 'Completed',
      quantity: 8,
      rating: 22.4,
      value: 10,
      assignee: 'Bob Jones',
    },
    {
      code: 'REC-004',
      department: 'Engineering',
      category: 'Component Y',
      type: 'Review',
      status: 'In Progress',
      quantity: 5,
      rating: 15.8,
      value: 2,
      assignee: 'Bob Jones',
    },
    {
      code: 'REC-005',
      department: 'Sales',
      category: 'Widget A',
      type: 'Delivery',
      status: 'In Progress',
      quantity: 7,
      rating: 20.1,
      value: 20,
      assignee: 'Carol Davis',
    },
    {
      code: 'REC-006',
      department: 'Sales',
      category: 'Module Alpha',
      type: 'Delivery',
      status: 'Completed',
      quantity: 6,
      rating: 17.5,
      value: 25,
      assignee: 'Carol Davis',
    },
    {
      code: 'REC-007',
      department: 'Marketing',
      category: 'Module Beta',
      type: 'Audit',
      status: 'Completed',
      quantity: 9,
      rating: 28.6,
      value: 7,
      assignee: 'Carol Davis',
    },
    {
      code: 'REC-008',
      department: 'Marketing',
      category: 'Widget A',
      type: 'Review',
      status: 'Completed',
      quantity: 3,
      rating: 10.2,
      value: 23,
      assignee: 'Carol Davis',
    },
    {
      code: 'REC-009',
      department: 'Support',
      category: 'Service Pack',
      type: 'Audit',
      status: 'Pending',
      quantity: 4,
      rating: 13.9,
      value: 30,
      assignee: 'Carol Davis',
    },
    {
      code: 'REC-010',
      department: 'Support',
      category: 'Widget B',
      type: 'Delivery',
      status: 'Completed',
      quantity: 7,
      rating: 21.3,
      value: 28,
      assignee: 'Carol Davis',
    },
  ]);

  protected readonly cols: Column[] = [
    { field: 'code', header: 'Code', sortable: true, style: 'min-width: 7rem' },
    { field: 'department', header: 'Department', sortable: true, style: 'min-width: 9rem' },
    { field: 'category', header: 'Category', sortable: false, style: 'min-width: 10rem' },
    { field: 'type', header: 'Type', sortable: true, style: 'min-width: 7rem' },
    { field: 'status', header: 'Status', sortable: true, style: 'min-width: 9rem' },
    { field: 'quantity', header: 'Quantity', sortable: true, style: 'min-width: 8rem' },
    { field: 'rating', header: 'Rating', sortable: true, style: 'min-width: 8rem' },
    { field: 'value', header: 'Value', sortable: true, style: 'min-width: 8rem' },
    { field: 'assignee', header: 'Assignee', sortable: false, style: 'min-width: 9rem' },
  ];

  protected selectedColumns: Column[] = [...this.cols];

  protected sortSelectedColumns(): void {
    this.selectedColumns = this.cols.filter((col) =>
      this.selectedColumns.some((sc) => sc.field === col.field),
    );
  }

  protected selectedRecords: Record[] = [];

  protected getStatusSeverity(status: string): 'success' | 'warn' | 'secondary' {
    if (status === 'Completed') return 'success';
    if (status === 'In Progress') return 'warn';
    return 'secondary';
  }

  protected getStatusIcon(status: string): string {
    if (status === 'Completed') return 'pi pi-check-circle';
    if (status === 'In Progress') return 'pi pi-clock';
    return 'pi pi-circle';
  }

  protected readonly activityGroups = signal<ActivityGroup[]>([
    {
      department: 'Operations',
      items: [
        {
          id: 'REC-001',
          code: 'REC-001',
          category: 'Widget A',
          type: 'Audit',
          status: 'In Progress',
          time: '30 min ago',
          icon: 'pi pi-list-check',
          iconColor: '#10b981',
        },
        {
          id: 'REC-002',
          code: 'REC-002',
          category: 'Widget B',
          type: 'Audit',
          status: 'Completed',
          time: '2 hours ago',
          icon: 'pi pi-list-check',
          iconColor: '#10b981',
        },
      ],
    },
    {
      department: 'Engineering',
      items: [
        {
          id: 'REC-003',
          code: 'REC-003',
          category: 'Component X',
          type: 'Review',
          status: 'Completed',
          time: '1 hour ago',
          icon: 'pi pi-chart-bar',
          iconColor: '#3b82f6',
        },
        {
          id: 'REC-004',
          code: 'REC-004',
          category: 'Component Y',
          type: 'Review',
          status: 'In Progress',
          time: '3 hours ago',
          icon: 'pi pi-chart-bar',
          iconColor: '#3b82f6',
        },
      ],
    },
    {
      department: 'Sales',
      items: [
        {
          id: 'REC-005',
          code: 'REC-005',
          category: 'Widget A',
          type: 'Delivery',
          status: 'In Progress',
          time: '45 min ago',
          icon: 'pi pi-box',
          iconColor: '#f59e0b',
        },
        {
          id: 'REC-006',
          code: 'REC-006',
          category: 'Module Alpha',
          type: 'Delivery',
          status: 'Completed',
          time: '1 day ago',
          icon: 'pi pi-box',
          iconColor: '#f59e0b',
        },
      ],
    },
  ]);

  protected activitySearch = '';

  protected getActivityStatusClass(status: string): string {
    if (status === 'Completed') return 'text-green-600 dark:text-green-400';
    if (status === 'In Progress') return 'text-amber-500 dark:text-amber-400';
    return 'text-muted-color';
  }

  protected openViewDialog(record: Record): void {
    this.selectedRecord.set(record);
    this.viewDialogVisible.set(true);
  }

  protected openEditDialog(record: Record): void {
    this.selectedRecord.set(record);
    this.editForm.patchValue(record);
    this.editDialogVisible.set(true);
  }

  protected openCreateDialog(): void {
    this.createForm.reset();
    this.createDialogVisible.set(true);
  }

  protected saveEdit(): void {
    if (this.editForm.invalid) return;
    console.log('Update record:', this.editForm.value);
    this.editDialogVisible.set(false);
  }

  protected saveCreate(): void {
    if (this.createForm.invalid) return;
    console.log('Create record:', this.createForm.value);
    this.createDialogVisible.set(false);
  }

  protected confirmDelete(record: Record): void {
    this.confirmationService.confirm({
      header: 'Delete Record',
      message: `Are you sure you want to delete record "${record.code}"?`,
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', variant: 'outlined' },
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      accept: () => {
        console.log('Delete record:', record);
      },
      reject: () => {
        console.log('Deletion cancelled');
      },
    });
  }

  protected confirmLogout(): void {
    this.confirmationService.confirm({
      header: 'Sign out',
      message: 'Are you sure you want to sign out?',
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', variant: 'outlined' },
      acceptButtonProps: { label: 'Sign out', severity: 'danger' },
      accept: () => {
        console.log('User confirmed logout');
      },
      reject: () => {
        console.log('User cancelled logout');
      },
    });
  }
}
