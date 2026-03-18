import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { SidebarPanelMenuPreview } from './sidebar-panel-menu';

describe('SidebarPanelMenuPreview', () => {
  let component: SidebarPanelMenuPreview;
  let fixture: ComponentFixture<SidebarPanelMenuPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarPanelMenuPreview],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarPanelMenuPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render panel menu', () => {
    const panelMenu = el.querySelector('p-panelmenu');
    expect(panelMenu).toBeTruthy();
  });

  it('should render dashboard content', () => {
    const dashboard = el.querySelector('app-dashboard-content');
    expect(dashboard).toBeTruthy();
  });
});
