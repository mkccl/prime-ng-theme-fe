import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarGroupedPreview } from './sidebar-grouped';

describe('SidebarGroupedPreview', () => {
  let component: SidebarGroupedPreview;
  let fixture: ComponentFixture<SidebarGroupedPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarGroupedPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarGroupedPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 group headers', () => {
    const headers = el.querySelectorAll('nav span.uppercase');
    expect(headers.length).toBe(2);
  });

  it('should render 6 menu items total', () => {
    const items = el.querySelectorAll('nav a');
    expect(items.length).toBe(6);
  });
});
