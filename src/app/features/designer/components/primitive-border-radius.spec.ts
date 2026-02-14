import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { PrimitiveBorderRadius } from './primitive-border-radius';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('PrimitiveBorderRadius', () => {
  let fixture: ComponentFixture<PrimitiveBorderRadius>;
  let component: PrimitiveBorderRadius;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveBorderRadius],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.createThemeFromPreset('Test', structuredClone(Aura));

    fixture = TestBed.createComponent(PrimitiveBorderRadius);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 6 token fields for border radius sizes', () => {
    const tokenFields = el.querySelectorAll('design-token-field');
    expect(tokenFields.length).toBe(6);
  });

  it('should display labels for all radius sizes', () => {
    const labels = el.querySelectorAll('label');
    const labelTexts = Array.from(labels).map((l) => l.textContent?.trim());
    expect(labelTexts).toContain('None');
    expect(labelTexts).toContain('Extra Small');
    expect(labelTexts).toContain('Small');
    expect(labelTexts).toContain('Medium');
    expect(labelTexts).toContain('Large');
    expect(labelTexts).toContain('Extra Large');
  });

  it('should read border radius from preset', () => {
    const borderRadius = service.designer().theme?.preset?.primitive?.borderRadius;
    expect(borderRadius).toBeTruthy();
    expect(component.borderRadiusMd).toBeTruthy();
  });

  it('should update preset on border radius change', () => {
    component.borderRadiusMd = '12px';
    const updated = service.designer().theme?.preset?.primitive?.borderRadius?.md;
    expect(updated).toBe('12px');
  });
});
