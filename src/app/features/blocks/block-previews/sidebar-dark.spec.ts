import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDarkPreview } from './sidebar-dark';

describe('SidebarDarkPreview', () => {
  let component: SidebarDarkPreview;
  let fixture: ComponentFixture<SidebarDarkPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDarkPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarDarkPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 menu items', () => {
    const navLinks = el.querySelectorAll('nav > a');
    expect(navLinks.length).toBe(5);
  });

  it('should render Logout link', () => {
    const logoutIcon = el.querySelector('.pi-sign-out');
    expect(logoutIcon).toBeTruthy();
    const logoutLink = logoutIcon?.closest('a');
    expect(logoutLink?.textContent?.trim()).toBe('Logout');
  });
});
