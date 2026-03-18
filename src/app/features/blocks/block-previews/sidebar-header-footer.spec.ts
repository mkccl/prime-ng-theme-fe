import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHeaderFooterPreview } from './sidebar-header-footer';

describe('SidebarHeaderFooterPreview', () => {
  let component: SidebarHeaderFooterPreview;
  let fixture: ComponentFixture<SidebarHeaderFooterPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarHeaderFooterPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarHeaderFooterPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Acme App" header', () => {
    const header = el.querySelector('.text-sm.font-bold');
    expect(header?.textContent?.trim()).toBe('Acme App');
  });

  it('should display version footer', () => {
    const footer = el.querySelector('.border-t.border-surface-200.text-center');
    expect(footer?.textContent?.trim()).toBe('Acme App v2.4.1');
  });

  it('should render 6 menu items', () => {
    const items = el.querySelectorAll('nav a');
    expect(items.length).toBe(6);
  });
});
