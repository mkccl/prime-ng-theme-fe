import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { SidebarMiniTooltipsPreview } from './sidebar-mini-tooltips';

describe('SidebarMiniTooltipsPreview', () => {
  let component: SidebarMiniTooltipsPreview;
  let fixture: ComponentFixture<SidebarMiniTooltipsPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMiniTooltipsPreview],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarMiniTooltipsPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 icon links', () => {
    const navLinks = el.querySelectorAll('nav a');
    // 5 item links + 1 settings link at the bottom = 6 total
    expect(navLinks.length).toBe(6);
  });

  it('should render settings link', () => {
    const settingsIcon = el.querySelector('nav a .pi-cog');
    expect(settingsIcon).toBeTruthy();
    const settingsLink = settingsIcon?.closest('a');
    expect(settingsLink).toBeTruthy();
  });
});
