import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarClassicPreview } from './sidebar-classic';

describe('SidebarClassicPreview', () => {
  let component: SidebarClassicPreview;
  let fixture: ComponentFixture<SidebarClassicPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarClassicPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarClassicPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nav element', () => {
    const nav = el.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('should render 5 menu items', () => {
    const items = el.querySelectorAll('nav a');
    expect(items.length).toBe(5);
  });

  it('should render dashboard content', () => {
    const dashboard = el.querySelector('app-dashboard-content');
    expect(dashboard).toBeTruthy();
  });
});
