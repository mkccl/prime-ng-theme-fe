import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { SemanticEditor } from './semantic-editor';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('SemanticEditor', () => {
  let fixture: ComponentFixture<SemanticEditor>;
  let component: SemanticEditor;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemanticEditor],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.createThemeFromPreset('Test', structuredClone(Aura));

    fixture = TestBed.createComponent(SemanticEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Common accordion panel', () => {
    const headers = el.querySelectorAll('[data-pc-name="accordionheader"]');
    const texts = Array.from(headers).map((h) => h.textContent?.trim());
    expect(texts).toContain('Common');
  });

  it('should render Color Scheme accordion panel', () => {
    const headers = el.querySelectorAll('[data-pc-name="accordionheader"]');
    const texts = Array.from(headers).map((h) => h.textContent?.trim());
    expect(texts).toContain('Color Scheme');
  });

  it('should apply theme on Enter key', () => {
    const spy = vi.spyOn(service, 'applyTheme');
    const div = el.querySelector('div')!;
    div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });
});
