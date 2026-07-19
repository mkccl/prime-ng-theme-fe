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

  it('should render three workflow steps', async () => {
    const fixture = TestBed.createComponent(HowItWorks);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('.how-step').length).toBe(3);
    expect(el.querySelectorAll('.step-number').length).toBe(3);
  });

  it('should render the workflow heading and designer action', async () => {
    const fixture = TestBed.createComponent(HowItWorks);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('#workflow-title')).toBeTruthy();
    expect(el.querySelector('.workflow-action a')?.textContent).toContain('Open the visual designer');
  });
});
