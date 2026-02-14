import { TestBed } from '@angular/core/testing';

import { DesignerPreviewCard } from './designer-preview-card';

describe('DesignerPreviewCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignerPreviewCard],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render window chrome (traffic light dots)', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.preview-dot--red')).toBeTruthy();
    expect(el.querySelector('.preview-dot--yellow')).toBeTruthy();
    expect(el.querySelector('.preview-dot--green')).toBeTruthy();
  });

  it('should render sidebar tabs', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const tabs = el.querySelectorAll('.preview-tab');
    expect(tabs.length).toBe(4);
  });

  it('should render swatch grid', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const swatches = el.querySelectorAll('.preview-swatch');
    expect(swatches.length).toBe(12);
  });

  it('should have active state on Colors tab', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const activeTab = el.querySelector('.preview-tab--active');
    expect(activeTab?.textContent?.trim()).toContain('Colors');
  });
});
