import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HowItWorks } from './how-it-works';

describe('HowItWorks', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorks],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HowItWorks);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render three steps', async () => {
    const fixture = TestBed.createComponent(HowItWorks);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.how-step').length).toBe(3);
  });

  it('should render section title', async () => {
    const fixture = TestBed.createComponent(HowItWorks);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.how-title')).toBeTruthy();
  });
});
