import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { InputNumber } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { Fieldset } from 'primeng/fieldset';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { Badge } from 'primeng/badge';
import { ProgressBar } from 'primeng/progressbar';
import { Chip } from 'primeng/chip';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';
import { SliderModule } from 'primeng/slider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
  selector: 'design-preview',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    Button,
    InputText,
    Textarea,
    Select,
    Checkbox,
    RadioButton,
    ToggleSwitch,
    InputNumber,
    TableModule,
    Card,
    Fieldset,
    Message,
    Tag,
    Badge,
    ProgressBar,
    Chip,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    DividerModule,
    DatePickerModule,
    SliderModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    DrawerModule,
    TreeModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignPreview {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  protected readonly checked = signal(true);
  protected readonly switchValue = signal(true);
  protected readonly radioValue = signal('option1');
  protected readonly numberValue = signal(42);
  protected readonly inputValue = signal('Sample text');
  protected readonly textareaValue = signal('Multi-line\nsample text');
  protected readonly selectedCity = signal<string | null>(null);
  protected readonly dateValue = signal<Date | null>(new Date());
  protected readonly sliderValue = signal(50);

  protected readonly cities = signal([
    { label: 'New York', value: 'ny' },
    { label: 'London', value: 'ldn' },
    { label: 'Paris', value: 'prs' },
    { label: 'Tokyo', value: 'tky' },
  ]);

  protected readonly tableData = signal([
    { name: 'Bamboo Watch', category: 'Accessories', price: 65 },
    { name: 'Black T-Shirt', category: 'Clothing', price: 29 },
    { name: 'Gaming Set', category: 'Electronics', price: 299 },
    { name: 'Gold Phone Case', category: 'Accessories', price: 24 },
    { name: 'Green Earbuds', category: 'Electronics', price: 89 },
  ]);

  protected readonly progressValue = signal(65);

  protected readonly isDialogVisible = signal(false);

  openDialog() {
    this.isDialogVisible.set(true);
  }

  closeDialog() {
    this.isDialogVisible.set(false);
  }

  protected readonly isDrawerVisible = signal(false);

  openDrawer() {
    this.isDrawerVisible.set(true);
  }

  confirmDialog(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  showContrast() {
    this.messageService.add({
      severity: 'contrast',
      summary: 'Contrast',
      detail: 'Message Content',
    });
  }

  showSecondary() {
    this.messageService.add({
      severity: 'secondary',
      summary: 'Secondary',
      detail: 'Message Content',
    });
  }

  protected readonly data = signal<TreeNode[]>([
    {
      key: '0',
      label: 'Documents',
      data: 'Documents Folder',
      icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '0-0',
          label: 'Work',
          data: 'Work Folder',
          icon: 'pi pi-fw pi-cog',
          children: [
            {
              key: '0-0-0',
              label: 'Expenses.doc',
              icon: 'pi pi-fw pi-file',
              data: 'Expenses Document',
            },
            {
              key: '0-0-1',
              label: 'Resume.doc',
              icon: 'pi pi-fw pi-file',
              data: 'Resume Document',
            },
          ],
        },
        {
          key: '0-1',
          label: 'Home',
          data: 'Home Folder',
          icon: 'pi pi-fw pi-home',
          children: [
            {
              key: '0-1-0',
              label: 'Invoices.txt',
              icon: 'pi pi-fw pi-file',
              data: 'Invoices for this month',
            },
          ],
        },
      ],
    },
    {
      key: '1',
      label: 'Events',
      data: 'Events Folder',
      icon: 'pi pi-fw pi-calendar',
      children: [
        { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
        {
          key: '1-1',
          label: 'Product Launch',
          icon: 'pi pi-fw pi-calendar-plus',
          data: 'Product Launch',
        },
        {
          key: '1-2',
          label: 'Report Review',
          icon: 'pi pi-fw pi-calendar-plus',
          data: 'Report Review',
        },
      ],
    },
    {
      key: '2',
      label: 'Movies',
      data: 'Movies Folder',
      icon: 'pi pi-fw pi-star-fill',
      children: [
        {
          key: '2-0',
          icon: 'pi pi-fw pi-star-fill',
          label: 'Al Pacino',
          data: 'Pacino Movies',
          children: [
            {
              key: '2-0-0',
              label: 'Scarface',
              icon: 'pi pi-fw pi-video',
              data: 'Scarface Movie',
            },
            { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' },
          ],
        },
        {
          key: '2-1',
          label: 'Robert De Niro',
          icon: 'pi pi-fw pi-star-fill',
          data: 'De Niro Movies',
          children: [
            {
              key: '2-1-0',
              label: 'Goodfellas',
              icon: 'pi pi-fw pi-video',
              data: 'Goodfellas Movie',
            },
            {
              key: '2-1-1',
              label: 'Untouchables',
              icon: 'pi pi-fw pi-video',
              data: 'Untouchables Movie',
            },
          ],
        },
      ],
    },
  ]);
}
