import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ProgressBar } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';

type CustomerStatus = 'unqualified' | 'qualified' | 'negotiation' | 'new' | 'renewal' | 'proposal';

interface Customer {
  name: string;
  country: string;
  flag: string;
  representative: string;
  avatar: string;
  date: string;
  balance: number;
  status: CustomerStatus;
  activity: number;
}

const BASE_CUSTOMERS: Customer[] = [
  { name: 'James Butt', country: 'Algeria', flag: 'al', representative: 'Ioni Bowcher', avatar: '/landing/ionibowcher.png', date: '09/13/2015', balance: 70663, status: 'unqualified', activity: 17 },
  { name: 'Josephine Darakjy', country: 'Egypt', flag: 'eg', representative: 'Amy Elsner', avatar: '/landing/amyelsner.png', date: '02/09/2019', balance: 82429, status: 'negotiation', activity: 0 },
  { name: 'Art Venere', country: 'Panama', flag: 'pa', representative: 'Asiya Javayant', avatar: '/landing/asiyajavayant.png', date: '05/13/2017', balance: 28334, status: 'qualified', activity: 63 },
  { name: 'Lenna Paprocki', country: 'Slovenia', flag: 'si', representative: 'Xuxue Feng', avatar: '/landing/xuxuefeng.png', date: '09/15/2020', balance: 88521, status: 'new', activity: 37 },
  { name: 'Donette Foller', country: 'South Africa', flag: 'za', representative: 'Asiya Javayant', avatar: '/landing/asiyajavayant.png', date: '05/20/2016', balance: 93905, status: 'negotiation', activity: 33 },
];

@Component({
  selector: 'app-customer-showcase',
  standalone: true,
  imports: [FormsModule, Button, InputText, ProgressBar, TableModule, Tag],
  templateUrl: './customer-showcase.html',
  styleUrl: './customer-showcase.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerShowcase {
  protected readonly query = signal('');
  protected readonly selectedCustomers = signal<Customer[]>([]);
  protected readonly customers: Customer[] = Array.from({ length: 5 }, (_, group) =>
    BASE_CUSTOMERS.map((customer, index) => ({
      ...customer,
      name: group === 0 ? customer.name : `${customer.name} ${group + 1}`,
      balance: customer.balance + group * 1750 + index * 250,
      activity: Math.min(100, customer.activity + group * 7),
    })),
  ).flat();

  protected readonly filteredCustomers = computed(() => {
    const query = this.query().trim().toLowerCase();
    if (!query) return this.customers;
    return this.customers.filter((customer) =>
      [customer.name, customer.country, customer.representative, customer.status]
        .some((value) => value.toLowerCase().includes(query)),
    );
  });

  protected setQuery(value: string): void { this.query.set(value); }

  protected balance(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  }

  protected severity(status: CustomerStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'qualified': return 'success';
      case 'new': return 'info';
      case 'negotiation': return 'warn';
      case 'unqualified': return 'danger';
      case 'renewal': return 'secondary';
      case 'proposal': return 'info';
    }
  }
}
