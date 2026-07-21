import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShowcase } from './customer-showcase';

describe('CustomerShowcase', () => {
  let fixture: ComponentFixture<CustomerShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CustomerShowcase] }).compileComponents();
    fixture = TestBed.createComponent(CustomerShowcase);
    fixture.detectChanges();
  });

  it('renders the source-style customer data table', () => {
    expect(fixture.nativeElement.textContent).toContain('James Butt');
    expect(fixture.nativeElement.querySelector('p-table')).toBeTruthy();
  });
});
