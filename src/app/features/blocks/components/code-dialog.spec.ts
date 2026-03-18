import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { CodeDialog } from './code-dialog';

describe('CodeDialog', () => {
  let fixture: ComponentFixture<CodeDialog>;
  let component: CodeDialog;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeDialog],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeDialog);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'Test Dialog');
    fixture.componentRef.setInput('htmlCode', '<div>Test</div>');
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render HTML tab when visible', async () => {
    component.visible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const tabs = document.querySelectorAll('p-tab');
    const tabTexts = Array.from(tabs).map((t) => t.textContent?.trim());
    expect(tabTexts).toContain('HTML');
  });

  it('should render TypeScript tab when tsCode is provided', async () => {
    fixture.componentRef.setInput('tsCode', 'const x = 1;');
    component.visible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const tabs = document.querySelectorAll('p-tab');
    const tabTexts = Array.from(tabs).map((t) => t.textContent?.trim());
    expect(tabTexts).toContain('TypeScript');
  });

  it('should not render TypeScript tab when tsCode is not provided', async () => {
    component.visible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const tabs = document.querySelectorAll('p-tab');
    const tabTexts = Array.from(tabs).map((t) => t.textContent?.trim());
    expect(tabTexts).not.toContain('TypeScript');
  });
});
