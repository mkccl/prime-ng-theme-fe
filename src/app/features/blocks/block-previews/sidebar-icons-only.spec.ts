import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarIconsOnlyPreview } from './sidebar-icons-only';

describe('SidebarIconsOnlyPreview', () => {
  let component: SidebarIconsOnlyPreview;
  let fixture: ComponentFixture<SidebarIconsOnlyPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarIconsOnlyPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarIconsOnlyPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 icon links', () => {
    const items = el.querySelectorAll('nav a');
    expect(items.length).toBe(5);
  });

  it('should render dashboard content', () => {
    const dashboard = el.querySelector('app-dashboard-content');
    expect(dashboard).toBeTruthy();
  });
});
