import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { ComponentEditor } from './component-editor';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('ComponentEditor', () => {
  let fixture: ComponentFixture<ComponentEditor>;
  let component: ComponentEditor;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentEditor],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.createThemeFromPreset('Test', structuredClone(Aura));

    fixture = TestBed.createComponent(ComponentEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component select dropdown', () => {
    const select = el.querySelector('[data-pc-name="select"]');
    expect(select).toBeTruthy();
  });

  it('should not render component tokens before selection', () => {
    const fieldsets = el.querySelectorAll('[data-pc-name="fieldset"]');
    expect(fieldsets.length).toBe(0);
  });
});
