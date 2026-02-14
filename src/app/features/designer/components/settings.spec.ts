import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Settings } from './settings';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('Settings', () => {
  let fixture: ComponentFixture<Settings>;
  let component: Settings;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Settings],
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

    fixture = TestBed.createComponent(Settings);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Font heading', () => {
    const heading = el.querySelector('.text-lg');
    expect(heading?.textContent?.trim()).toBe('Font');
  });

  it('should render font size select with options', () => {
    const selects = el.querySelectorAll('select');
    expect(selects.length).toBe(2);
    const sizeSelect = selects[0];
    const options = sizeSelect.querySelectorAll('option');
    expect(options.length).toBe(service.fontSizes.length);
  });

  it('should render font family select with options', () => {
    const selects = el.querySelectorAll('select');
    const familySelect = selects[1];
    const options = familySelect.querySelectorAll('option');
    expect(options.length).toBe(service.fonts.length);
  });

  it('should have 14px selected by default', () => {
    const sizeSelect = el.querySelectorAll('select')[0] as HTMLSelectElement;
    expect(sizeSelect.value).toBe('14px');
  });

  it('should have Inter var selected by default', () => {
    const familySelect = el.querySelectorAll('select')[1] as HTMLSelectElement;
    expect(familySelect.value).toBe('Inter var');
  });

  it('should update config on font size change', async () => {
    const sizeSelect = el.querySelectorAll('select')[0] as HTMLSelectElement;
    sizeSelect.value = '16px';
    sizeSelect.dispatchEvent(new Event('input'));
    sizeSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(service.designer().theme?.config.fontSize).toBe('16px');
  });
});
