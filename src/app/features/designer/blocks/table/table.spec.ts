import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { TableBlock } from './table';

describe('TableBlock', () => {
  let component: TableBlock;
  let fixture: ComponentFixture<TableBlock>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBlock],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(TableBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 10 records', () => {
    const records = (component as any).records();
    expect(records.length).toBe(10);
  });

  it('should create edit and create forms on init', () => {
    expect((component as any).editForm).toBeTruthy();
    expect((component as any).createForm).toBeTruthy();
  });

  it('should return correct status severity', () => {
    const getSeverity = (s: string) => (component as any).getStatusSeverity(s);
    expect(getSeverity('Completed')).toBe('success');
    expect(getSeverity('In Progress')).toBe('warn');
    expect(getSeverity('Pending')).toBe('secondary');
  });

  it('should return correct status icon', () => {
    const getIcon = (s: string) => (component as any).getStatusIcon(s);
    expect(getIcon('Completed')).toBe('pi pi-check-circle');
    expect(getIcon('In Progress')).toBe('pi pi-clock');
    expect(getIcon('Pending')).toBe('pi pi-circle');
  });

  it('should validate enum values', () => {
    const validator = (component as any).enumValidator(['A', 'B']);
    expect(validator(new FormControl('A'))).toBeNull();
    expect(validator(new FormControl('C'))).toEqual({
      invalidEnum: { value: 'C', allowed: ['A', 'B'] },
    });
  });
});
