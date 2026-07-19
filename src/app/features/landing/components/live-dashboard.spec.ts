import { ComponentFixture, TestBed } from '@angular/core/testing';

import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { ThemeStateService } from '../services/theme-state.service';
import { LiveDashboard } from './live-dashboard';

describe('LiveDashboard', () => {
  let fixture: ComponentFixture<LiveDashboard>;
  let component: LiveDashboard;
  let el: HTMLElement;
  let themeState: ThemeStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveDashboard],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveDashboard);
    component = fixture.componentInstance;
    themeState = TestBed.inject(ThemeStateService);
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dashboard KPIs and the audit rows', () => {
    expect(el.querySelectorAll('.kpi-card').length).toBe(4);
    expect(component['auditRows'].length).toBe(5);
  });

  it('should expose accessible quick theme controls', () => {
    const swatches = el.querySelectorAll<HTMLButtonElement>('.quick-swatch');
    expect(swatches.length).toBe(5);
    expect(swatches[0].getAttribute('aria-label')).toContain('primary color');
    expect(swatches[0].hasAttribute('aria-pressed')).toBe(true);
  });

  it('should apply a primary color through ThemeStateService', () => {
    const setPrimary = vi.spyOn(themeState, 'setPrimary').mockImplementation(() => undefined);
    const swatches = el.querySelectorAll<HTMLButtonElement>('.quick-swatch');

    swatches[1].click();

    expect(setPrimary).toHaveBeenCalledWith(component['quickColors'][1].name);
  });

  it('should replace chart data when the range changes', () => {
    const previousData = component['chartData']();

    component['setRange']('30d');

    expect(component['selectedRange']()).toBe('30d');
    expect(component['chartData']()).not.toBe(previousData);
    expect(component['currentSeries'].labels.length).toBe(6);
  });

  it('should open a dialog with a semantic data table', async () => {
    component['openDataDialog']();
    fixture.detectChanges();
    await fixture.whenStable();

    const dialog = document.querySelector('p-dialog');
    const dataTable = document.querySelector('.dialog-table');
    expect(dialog).toBeTruthy();
    expect(dataTable?.querySelectorAll('tbody tr').length).toBe(
      component['currentSeries'].labels.length,
    );
  });

  it('should send toast feedback for export', () => {
    const messageService = fixture.debugElement.injector.get(MessageService);
    const add = vi.spyOn(messageService, 'add');

    component['exportSnapshot']();

    expect(add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success', summary: 'Snapshot ready' }),
    );
  });

  it('should rebuild the chart model after a theme event', () => {
    const previousData = component['chartData']();

    document.dispatchEvent(new CustomEvent('theme-switcher-change'));

    expect(component['chartData']()).not.toBe(previousData);
  });
});
