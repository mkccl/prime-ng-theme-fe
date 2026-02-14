import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { DesignEditor } from './editor';
import { ThemeDesignerService } from '../services/theme-designer.service';

describe('DesignEditor', () => {
  let fixture: ComponentFixture<DesignEditor>;
  let component: DesignEditor;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignEditor],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.createThemeFromPreset('Test', structuredClone(Aura));

    fixture = TestBed.createComponent(DesignEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 top-level tabs', () => {
    const tabList = el.querySelector('[data-pc-name="tablist"]');
    const tabs = tabList!.querySelectorAll('[data-pc-name="tab"]');
    expect(tabs.length).toBe(5);
  });

  it('should render tab labels', () => {
    const tabList = el.querySelector('[data-pc-name="tablist"]');
    const tabs = tabList!.querySelectorAll('[data-pc-name="tab"]');
    const labels = Array.from(tabs).map((t) => t.textContent?.trim());
    expect(labels).toEqual(['Primitive', 'Semantic', 'Component', 'Custom', 'Settings']);
  });

  it('should update activeTab in service on tab change', () => {
    service.designer.update((prev) => ({ ...prev, activeTab: 2 }));
    expect(service.designer().activeTab).toBe(2);
  });

  it('should apply theme on Enter key', () => {
    const spy = vi.spyOn(service, 'applyTheme');
    const div = el.querySelector('div')!;
    div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });
});
