import { ComponentFixture, TestBed } from '@angular/core/testing';

import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { LiveDashboard } from './live-dashboard';

describe('LiveDashboard', () => {
  let fixture: ComponentFixture<LiveDashboard>;
  let component: LiveDashboard;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveDashboard],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('renders the finance overview and realistic transactions', () => {
    expect(component).toBeTruthy();
    expect(el.querySelector('.chart-card')).toBeTruthy();
    expect(el.querySelectorAll('.transaction-row').length).toBe(4);
    expect(el.textContent).toContain('Crypto Analytics');
  });

  it('changes the chart period', () => {
    const oldData = component['chartData']();
    component['setPeriod']('Monthly');
    expect(component['period']()).toBe('Monthly');
    expect(component['chartData']()).not.toBe(oldData);
  });

  it('changes the active navigation state', () => {
    const chat = el.querySelector<HTMLButtonElement>('button[aria-label="Chat"]');
    chat?.click();
    fixture.detectChanges();
    expect(component['activeNav']()).toBe('Chat');
  });

  it('rebuilds chart colors after a theme event', () => {
    const oldData = component['chartData']();
    document.dispatchEvent(new CustomEvent('theme-switcher-change'));
    expect(component['chartData']()).not.toBe(oldData);
  });
});
