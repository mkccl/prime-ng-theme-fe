import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TokenField } from './token-field';
import { ThemeDesignerService } from '../services/theme-designer.service';

@Component({
  standalone: true,
  imports: [TokenField],
  template: ` <design-token-field [label]="label()" [type]="type()" [(modelValue)]="value" /> `,
})
class TestHost {
  label = signal('Background Color');
  type = signal<string | undefined>(undefined);
  value = signal<string | undefined>('#ff0000');
}

describe('TokenField', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: TestHost;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(el.querySelector('design-token-field')).toBeTruthy();
  });

  it('should display the label', () => {
    const label = el.querySelector('label');
    expect(label?.textContent?.trim()).toBe('Background Color');
  });

  it('should render the input with the model value', () => {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('#ff0000');
  });

  it('should show color preview when label contains color keyword', () => {
    const colorPreview = el.querySelector('[style*="background"]');
    expect(colorPreview).toBeTruthy();
  });

  it('should show color preview when type is explicitly color', () => {
    host.label.set('some field');
    host.type.set('color');
    fixture.detectChanges();
    const colorPreview = el.querySelector('[style*="background"]');
    expect(colorPreview).toBeTruthy();
  });

  it('should not show color preview for non-color fields', () => {
    host.label.set('Width');
    host.type.set(undefined);
    fixture.detectChanges();
    const previewDivs = el.querySelectorAll('.absolute.right-1');
    expect(previewDivs.length).toBe(0);
  });

  it('should render a datalist element', () => {
    const datalist = el.querySelector('datalist');
    expect(datalist).toBeTruthy();
    expect(datalist?.id).toContain('token-field-list-');
  });

  it('should link input to datalist via list attribute', () => {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement;
    const datalist = el.querySelector('datalist');
    expect(input.getAttribute('list')).toBe(datalist?.id);
  });

  it('should have maxlength 100', () => {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input.maxLength).toBe(100);
  });
});
