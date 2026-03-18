import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Landing } from './landing';

describe('Landing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Landing);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render hero section', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.hero')).toBeTruthy();
    expect(el.querySelector('.hero-headline')).toBeTruthy();
  });

  it('should render nav', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.nav')).toBeTruthy();
  });

  it('should render component preview cards', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const cards = el.querySelectorAll('.component-card');
    expect(cards.length).toBe(9);
  });

  it('should render footer', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.site-footer')).toBeTruthy();
  });

  it('should render theme switcher', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-theme-switcher')).toBeTruthy();
  });

  it('should start with isScrolled false', () => {
    const fixture = TestBed.createComponent(Landing);
    expect(fixture.componentInstance['isScrolled']()).toBe(false);
  });
});
