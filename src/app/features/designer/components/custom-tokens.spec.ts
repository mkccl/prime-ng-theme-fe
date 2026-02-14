import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTokens } from './custom-tokens';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('CustomTokens', () => {
  let fixture: ComponentFixture<CustomTokens>;
  let component: CustomTokens;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTokens],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.designer.update((prev) => ({
      ...prev,
      theme: {
        name: 'Test',
        preset: {},
        config: { fontSize: '14px', fontFamily: 'Inter var' },
      },
    }));

    fixture = TestBed.createComponent(CustomTokens);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render description text', () => {
    const p = el.querySelector('p');
    expect(p?.textContent).toContain('Extend the theming system');
  });

  it('should render Add New button', () => {
    const btn = Array.from(el.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Add New'),
    );
    expect(btn).toBeTruthy();
  });

  it('should render Save button', () => {
    const btn = Array.from(el.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Save'),
    );
    expect(btn).toBeTruthy();
  });

  it('should add a token entry when Add New is clicked', () => {
    const addBtn = Array.from(el.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Add New'),
    ) as HTMLButtonElement;

    addBtn.click();
    fixture.detectChanges();

    const inputs = el.querySelectorAll('input[type="text"]');
    expect(inputs.length).toBe(2); // name + value
  });

  it('should remove a token entry when remove button is clicked', () => {
    // Add two tokens
    const addBtn = Array.from(el.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Add New'),
    ) as HTMLButtonElement;
    addBtn.click();
    addBtn.click();
    fixture.detectChanges();

    let items = el.querySelectorAll('li');
    expect(items.length).toBe(2);

    // Remove the first one
    const removeBtn = el.querySelector('li button') as HTMLButtonElement;
    removeBtn.click();
    fixture.detectChanges();

    items = el.querySelectorAll('li');
    expect(items.length).toBe(1);
  });

  it('should load existing extend tokens on init', () => {
    // Reset with extend tokens
    service.designer.update((prev) => ({
      ...prev,
      theme: {
        name: 'Test',
        preset: { extend: { accent: { color: '#ff0000' } } },
        config: { fontSize: '14px', fontFamily: 'Inter var' },
      },
    }));

    // Re-create the component to trigger ngOnInit
    fixture = TestBed.createComponent(CustomTokens);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;

    const inputs = el.querySelectorAll('input[type="text"]');
    expect(inputs.length).toBe(2); // one name + one value
  });
});
