import { TestBed } from '@angular/core/testing';

import { NavThemeBar } from './nav-theme-bar';
import { ThemeStateService } from '../services/theme-state.service';

describe('NavThemeBar', () => {
  let service: ThemeStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavThemeBar],
    }).compileComponents();

    service = TestBed.inject(ThemeStateService);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavThemeBar);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render color swatches', async () => {
    const fixture = TestBed.createComponent(NavThemeBar);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const swatches = el.querySelectorAll('.theme-bar-swatch');
    expect(swatches.length).toBe(service.primaryColors.length);
  });

  it('should render dark mode toggle', async () => {
    const fixture = TestBed.createComponent(NavThemeBar);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const toggle = el.querySelector('.theme-bar-dark-toggle');
    expect(toggle).toBeTruthy();
  });

  it('should call service when swatch is clicked', async () => {
    const fixture = TestBed.createComponent(NavThemeBar);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    vi.spyOn(service, 'setPrimary');
    const swatches = el.querySelectorAll('.theme-bar-swatch');
    (swatches[3] as HTMLButtonElement).click();

    expect(service.setPrimary).toHaveBeenCalledWith(service.primaryColors[3].name);
  });

  it('should call toggleDark when dark toggle is clicked', async () => {
    const fixture = TestBed.createComponent(NavThemeBar);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    vi.spyOn(service, 'toggleDark');
    const toggle = el.querySelector('.theme-bar-dark-toggle') as HTMLButtonElement;
    toggle.click();

    expect(service.toggleDark).toHaveBeenCalled();
  });
});
