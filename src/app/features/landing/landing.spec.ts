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

  it('should render accessible page landmarks', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.skip-link')?.getAttribute('href')).toBe('#main-content');
    expect(el.querySelector('header nav[aria-label="Primary navigation"]')).toBeTruthy();
    expect(el.querySelector('main#main-content')).toBeTruthy();
    expect(el.querySelector('footer.site-footer')).toBeTruthy();
  });

  it('should render one hero heading and primary actions', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('#hero-title')?.textContent).toContain('Design the system');
    expect(el.querySelector('.hero-actions a[routerlink="/designer"]')).toBeTruthy();
  });

  it('should render the deferred dashboard placeholder', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('#preview')).toBeTruthy();
    expect(el.querySelector('.dashboard-placeholder')).toBeTruthy();
  });

  it('should render four proof points and four capabilities', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('.proof-item').length).toBe(4);
    expect(el.querySelectorAll('.capability').length).toBe(4);
  });

  it('should render the token story and workflow', async () => {
    const fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('app-designer-preview-card')).toBeTruthy();
    expect(el.querySelector('app-how-it-works')).toBeTruthy();
  });

  it('should render the theme switcher', async () => {
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
