import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';

import { ColorPalette } from './color-palette';

@Component({
  standalone: true,
  imports: [ColorPalette],
  template: `<design-color-palette [value]="value()" />`,
})
class TestHost {
  value = signal<Record<string, string> | undefined>(undefined);
}

describe('ColorPalette', () => {
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
    expect(el.querySelector('design-color-palette')).toBeTruthy();
  });

  it('should render no swatches when value is undefined', () => {
    const swatches = el.querySelectorAll('design-color-palette div');
    expect(swatches.length).toBe(0);
  });

  it('should render swatches for each color value', () => {
    host.value.set({ '50': '#fef2f2', '100': '#fee2e2', '200': '#fecaca' });
    fixture.detectChanges();
    const swatches = el.querySelectorAll('design-color-palette div');
    expect(swatches.length).toBe(3);
  });

  it('should set title attribute on each swatch', () => {
    host.value.set({ '50': '#fef2f2', '100': '#fee2e2' });
    fixture.detectChanges();
    const swatches = el.querySelectorAll('design-color-palette div');
    const titles = Array.from(swatches).map((s) => s.getAttribute('title'));
    expect(titles).toContain('#fef2f2');
    expect(titles).toContain('#fee2e2');
  });

  it('should have host flex class', () => {
    const palette = el.querySelector('design-color-palette');
    expect(palette?.classList.contains('flex')).toBe(true);
  });
});
