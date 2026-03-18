import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContent } from './dashboard-content';

describe('DashboardContent', () => {
  let component: DashboardContent;
  let fixture: ComponentFixture<DashboardContent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 stat cards', () => {
    const statCards = el.querySelectorAll('.grid > div');
    expect(statCards.length).toBe(4);
  });

  it('should render 5 activity items', () => {
    const activityItems = el.querySelectorAll('.flex.items-center.gap-3.py-2\\.5');
    expect(activityItems.length).toBe(5);
  });

  it('should show Dashboard heading', () => {
    const h1 = el.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('Dashboard');
  });
});
