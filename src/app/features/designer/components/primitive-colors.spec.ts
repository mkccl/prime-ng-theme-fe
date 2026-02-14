import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { PrimitiveColors } from './primitive-colors';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('PrimitiveColors', () => {
  let fixture: ComponentFixture<PrimitiveColors>;
  let component: PrimitiveColors;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveColors],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.createThemeFromPreset('Test', structuredClone(Aura));

    fixture = TestBed.createComponent(PrimitiveColors);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render color input elements', () => {
    const colorInputs = el.querySelectorAll('input[type="color"]');
    expect(colorInputs.length).toBeGreaterThan(0);
  });

  it('should render color palette components', () => {
    const palettes = el.querySelectorAll('design-color-palette');
    expect(palettes.length).toBeGreaterThan(0);
  });

  it('should render color key labels', () => {
    const spans = el.querySelectorAll('span.capitalize');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('should not include borderRadius in color keys', () => {
    const spans = el.querySelectorAll('span.capitalize');
    const labels = Array.from(spans).map((s) => s.textContent?.trim());
    expect(labels).not.toContain('borderRadius');
  });
});
