import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  ],
  templateUrl: './preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignPreview {
  protected readonly checked = signal(true);
  protected readonly switchValue = signal(true);
  protected readonly radioValue = signal('option1');
  protected readonly numberValue = signal(42);
  protected readonly inputValue = signal('Sample text');
  protected readonly textareaValue = signal('Multi-line\nsample text');
  protected readonly selectedCity = signal<string | null>(null);

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
}
