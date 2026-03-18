import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBlock } from './code-block';

describe('CodeBlock', () => {
  let fixture: ComponentFixture<CodeBlock>;
  let component: CodeBlock;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeBlock);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('code', '<div>Hello</div>');
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render highlighted code in a pre/code block', () => {
    const pre = el.querySelector('pre');
    const code = pre?.querySelector('code');
    expect(pre).toBeTruthy();
    expect(code).toBeTruthy();
    expect(code?.innerHTML).toBeTruthy();
  });

  it('should render copy button with "Copy" text initially', () => {
    const button = el.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent?.trim()).toContain('Copy');
  });

  it('should change button text to "Copied!" after clicking copy', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
    const button = el.querySelector('button') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(button.textContent?.trim()).toContain('Copied!');
  });
});
