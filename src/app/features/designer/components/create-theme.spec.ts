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

  it('should render a custom foundation and three starter theme choices', () => {
    const buttons = el.querySelectorAll('.starter-option');
    expect(buttons.length).toBe(4);
    const labels = Array.from(buttons).map((b) => b.textContent?.trim());
    expect(labels[0]).toContain('Custom');
    expect(labels[1]).toContain('shadcn');
    expect(labels[2]).toContain('Bootstrap');
    expect(labels[3]).toContain('Material');
    expect(buttons[0].getAttribute('aria-checked')).toBe('true');
  });

  it('should render the customization action', () => {
    const createBtn = Array.from(el.querySelectorAll('button[type="button"]')).find((b) =>
      b.textContent?.includes('Start customizing'),
    );
    expect(createBtn).toBeTruthy();
  });

  it('should apply the selected starter to the live preview immediately', () => {
    const previewSpy = vi.spyOn(service, 'previewThemeFromPreset');
    const bootstrapOption = Array.from(el.querySelectorAll('.starter-option')).find((button) =>
      button.textContent?.includes('Bootstrap'),
    ) as HTMLButtonElement;

    bootstrapOption.click();
    fixture.detectChanges();

    expect(bootstrapOption.getAttribute('aria-checked')).toBe('true');
    expect(previewSpy).toHaveBeenCalledWith(
      'Bootstrap',
      expect.any(Object),
      expect.objectContaining({ fontFamily: 'system-ui' }),
    );
    expect(service.previewThemeName()).toBe('Bootstrap');
    expect(service.previewFontSize()).toBe('16px');
    expect(getComputedStyle(document.documentElement).fontSize).toBe('14px');
  });

  it('should disable the customization action when name is empty', () => {
    const createBtn = Array.from(el.querySelectorAll('button[type="button"]')).find((b) =>
      b.textContent?.includes('Start customizing'),
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
      b.textContent?.includes('Import theme'),
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
      b.textContent?.includes('Import theme'),
    ) as HTMLButtonElement;
    importBtn.click();
    fixture.detectChanges();

    // Should have switched to editor view
    expect(service.designer().activeView).toBe('editor');
    expect(service.designer().theme!.name).toBe('My Imported Theme');

    // Should not show error
    const errorMsg = el.querySelector('p.import-error');
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
      b.textContent?.includes('Import theme'),
    ) as HTMLButtonElement;
    importBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const errorMsg = el.querySelector('p.import-error');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg?.textContent).toContain('Invalid theme token');
  });
});
