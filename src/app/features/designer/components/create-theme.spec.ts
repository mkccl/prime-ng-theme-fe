import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTheme } from './create-theme';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('CreateTheme', () => {
  let fixture: ComponentFixture<CreateTheme>;
  let component: CreateTheme;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTheme],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTheme);
    component = fixture.componentInstance;
    service = TestBed.inject(ThemeDesignerService);
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render theme name input', () => {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('My Custom Theme');
  });

  it('should render four preset buttons', () => {
    const buttons = el.querySelectorAll('section button[type="button"]');
    expect(buttons.length).toBe(4);
    const labels = Array.from(buttons).map((b) => b.textContent?.trim());
    expect(labels).toEqual(['Aura', 'Material', 'Lara', 'Nora']);
  });

  it('should render Create Theme button', () => {
    const createBtn = Array.from(el.querySelectorAll('button[type="button"]')).find((b) =>
      b.textContent?.includes('Create Theme'),
    );
    expect(createBtn).toBeTruthy();
  });

  it('should disable Create Theme button when name is empty', () => {
    const createBtn = Array.from(el.querySelectorAll('button[type="button"]')).find((b) =>
      b.textContent?.includes('Create Theme'),
    ) as HTMLButtonElement;
    expect(createBtn.disabled).toBe(true);
  });

  it('should render Import section', () => {
    const textarea = el.querySelector('textarea');
    expect(textarea).toBeTruthy();
    expect(textarea?.placeholder).toContain('base64');
  });

  it('should disable Import button when import value is empty', () => {
    const importBtn = Array.from(el.querySelectorAll('button[type="button"]')).find((b) =>
      b.textContent?.includes('Import'),
    ) as HTMLButtonElement;
    expect(importBtn.disabled).toBe(true);
  });

  it('should successfully import a valid theme', async () => {
    const validPayload = btoa(
      JSON.stringify({
        name: 'My Imported Theme',
        preset: { primitive: { red: '#f00' } },
        config: { fontSize: '14px', fontFamily: 'Inter var' },
      }),
    );

    const textarea = el.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = validPayload;
    textarea.dispatchEvent(new Event('input'));
    textarea.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const importBtn = Array.from(el.querySelectorAll('button[type="button"]')).find((b) =>
      b.textContent?.includes('Import'),
    ) as HTMLButtonElement;
    importBtn.click();
    fixture.detectChanges();

    // Should have switched to editor view
    expect(service.designer().activeView).toBe('editor');
    expect(service.designer().theme!.name).toBe('My Imported Theme');

    // Should not show error
    const errorMsg = el.querySelector('p.text-red-500');
    expect(errorMsg).toBeNull();
  });

  it('should show import error message for invalid theme', async () => {
    // Simulate typing an invalid import value via ngModel
    const textarea = el.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'invalid-base64';
    textarea.dispatchEvent(new Event('input'));
    textarea.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    // Click the import button
    const importBtn = Array.from(el.querySelectorAll('button[type="button"]')).find((b) =>
      b.textContent?.includes('Import'),
    ) as HTMLButtonElement;
    importBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const errorMsg = el.querySelector('p.text-red-500');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg?.textContent).toContain('Invalid theme token');
  });
});
