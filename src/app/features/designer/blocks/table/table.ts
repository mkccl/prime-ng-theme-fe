import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
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

import { Table, TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
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
  filterType?: string;
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

const CATEGORIES = [
  'Widget A',
  'Widget B',
  'Component X',
  'Component Y',
  'Module Alpha',
  'Module Beta',
  'Service Pack',
];

const TYPES = ['Audit', 'Review', 'Delivery'];
const STATUSES = ['In Progress', 'Completed', 'Pending'];

const SEED_DATA: Record[] = [
  { code: 'REC-001', department: 'Operations', category: 'Widget A', type: 'Audit', status: 'In Progress', quantity: 4, rating: 12.3, value: 18, assignee: 'Alice Smith' },
  { code: 'REC-002', department: 'Operations', category: 'Widget B', type: 'Audit', status: 'Completed', quantity: 6, rating: 18.7, value: 29, assignee: 'Alice Smith' },
  { code: 'REC-003', department: 'Engineering', category: 'Component X', type: 'Review', status: 'Completed', quantity: 8, rating: 22.4, value: 10, assignee: 'Bob Jones' },
  { code: 'REC-004', department: 'Engineering', category: 'Component Y', type: 'Review', status: 'In Progress', quantity: 5, rating: 15.8, value: 2, assignee: 'Bob Jones' },
  { code: 'REC-005', department: 'Sales', category: 'Widget A', type: 'Delivery', status: 'In Progress', quantity: 7, rating: 20.1, value: 20, assignee: 'Carol Davis' },
  { code: 'REC-006', department: 'Sales', category: 'Module Alpha', type: 'Delivery', status: 'Completed', quantity: 6, rating: 17.5, value: 25, assignee: 'Carol Davis' },
  { code: 'REC-007', department: 'Marketing', category: 'Module Beta', type: 'Audit', status: 'Completed', quantity: 9, rating: 28.6, value: 7, assignee: 'Carol Davis' },
  { code: 'REC-008', department: 'Marketing', category: 'Widget A', type: 'Review', status: 'Completed', quantity: 3, rating: 10.2, value: 23, assignee: 'Carol Davis' },
  { code: 'REC-009', department: 'Support', category: 'Service Pack', type: 'Audit', status: 'Pending', quantity: 4, rating: 13.9, value: 30, assignee: 'Carol Davis' },
  { code: 'REC-010', department: 'Support', category: 'Widget B', type: 'Delivery', status: 'Completed', quantity: 7, rating: 21.3, value: 28, assignee: 'Carol Davis' },
];

@Component({
  selector: 'app-table-block',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    Button,
    Tag,
    MultiSelect,
    Select,
    ConfirmDialog,
    InputText,
    IconField,
    InputIcon,
    Dialog,
    InputNumber,
    Tooltip,
  ],
  providers: [ConfirmationService],
  templateUrl: './table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBlock implements OnInit {
  private readonly confirmationService = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);

  protected readonly dt = viewChild<Table>('dt');

  // ── Data ───────────────────────────────────────────────────────────────────
  protected readonly records = signal<Record[]>([...SEED_DATA]);

  // ── Table UI state ─────────────────────────────────────────────────────────
  protected readonly loading = signal(false);
  protected readonly tableSize = signal<'small' | undefined | 'large'>(undefined);
  protected readonly globalFilterValue = signal('');

  protected selectedRecords: Record[] = [];

  protected readonly sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: undefined },
    { label: 'Large', value: 'large' },
  ];

  // ── Columns ────────────────────────────────────────────────────────────────
  protected readonly cols: Column[] = [
    { field: 'department', header: 'Department', sortable: true, style: 'min-width: 10rem', filterType: 'text' },
    { field: 'category', header: 'Category', sortable: true, style: 'min-width: 12rem', filterType: 'text' },
    { field: 'type', header: 'Type', sortable: true, style: 'min-width: 8rem', filterType: 'text' },
    { field: 'status', header: 'Status', sortable: true, style: 'min-width: 9rem', filterType: 'text' },
    { field: 'quantity', header: 'Quantity', sortable: true, style: 'min-width: 8rem', filterType: 'numeric' },
    { field: 'rating', header: 'Rating', sortable: true, style: 'min-width: 8rem', filterType: 'numeric' },
    { field: 'value', header: 'Value', sortable: true, style: 'min-width: 8rem', filterType: 'numeric' },
    { field: 'assignee', header: 'Assignee', sortable: false, style: 'min-width: 10rem', filterType: 'text' },
  ];

  protected selectedColumns: Column[] = [...this.cols];

  protected readonly globalFilterFields = ['code', 'department', 'category', 'type', 'status', 'assignee'];

  // ── Dialog state ───────────────────────────────────────────────────────────
  protected readonly viewDialogVisible = signal(false);
  protected readonly editDialogVisible = signal(false);
  protected readonly createDialogVisible = signal(false);
  protected readonly selectedRecord = signal<Record | null>(null);

  protected editForm!: FormGroup;
  protected createForm!: FormGroup;

  // ── Category & options ─────────────────────────────────────────────────────
  protected readonly categoryOptions = CATEGORIES.map((s) => ({ label: s, value: s }));
  protected readonly typeOptions = TYPES.map((t) => ({ label: t, value: t }));
  protected readonly statusOptions = STATUSES.map((s) => ({ label: s, value: s }));

  // ── Validators ─────────────────────────────────────────────────────────────
  enumValidator(allowedValues: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return allowedValues.includes(control.value)
        ? null
        : { invalidEnum: { value: control.value, allowed: allowedValues } };
    };
  }

  ngOnInit(): void {
    const recordFormConfig = {
      code: ['', [Validators.required, Validators.pattern(/^REC-\d{3}$/)]],
      department: ['', Validators.required],
      category: ['', [Validators.required, this.enumValidator(CATEGORIES)]],
      type: ['', [Validators.required, this.enumValidator(TYPES)]],
      status: ['', [Validators.required, this.enumValidator(STATUSES)]],
      quantity: [null as number | null, [Validators.required, Validators.min(0)]],
      rating: [null as number | null, [Validators.required, Validators.min(0)]],
      value: [null as number | null, [Validators.required, Validators.min(0)]],
      assignee: [null as string | null],
    };
    this.editForm = this.fb.group(recordFormConfig);
    this.createForm = this.fb.group(recordFormConfig);
  }

  // ── Table helpers ──────────────────────────────────────────────────────────
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

  protected sortSelectedColumns(): void {
    this.selectedColumns = this.cols.filter((col) =>
      this.selectedColumns.some((sc) => sc.field === col.field),
    );
  }

  protected onGlobalFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilterValue.set(value);
    this.dt()?.filterGlobal(value, 'contains');
  }

  protected refresh(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1500);
  }

  protected exportCsv(): void {
    this.dt()?.exportCSV();
  }

  // ── CRUD ───────────────────────────────────────────────────────────────────
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
    const updated = this.editForm.value as Record;
    this.records.update((list) =>
      list.map((p) => (p.code === updated.code ? { ...p, ...updated } : p)),
    );
    this.editDialogVisible.set(false);
  }

  protected saveCreate(): void {
    if (this.createForm.invalid) return;
    const newRecord = this.createForm.value as Record;
    this.records.update((list) => [...list, newRecord]);
    this.createDialogVisible.set(false);
  }

  protected confirmDelete(record: Record): void {
    this.confirmationService.confirm({
      header: 'Delete Record',
      message: `Are you sure you want to delete record "${record.code}"?`,
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', variant: 'outlined' },
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      accept: () => {
        this.records.update((list) => list.filter((p) => p.code !== record.code));
      },
    });
  }
}
