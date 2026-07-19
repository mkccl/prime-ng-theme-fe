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

  it('should render window chrome', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.preview-dot--red')).toBeTruthy();
    expect(el.querySelector('.preview-dot--yellow')).toBeTruthy();
    expect(el.querySelector('.preview-dot--green')).toBeTruthy();
  });

  it('should render three accessible token layer controls', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const buttons = el.querySelectorAll<HTMLButtonElement>('.layer-button');

    expect(buttons.length).toBe(3);
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('false');
  });

  it('should render the primitive palette by default', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('.palette-swatch').length).toBe(11);
    expect(el.querySelector('.token-path')?.textContent).toContain('primitive.emerald');
  });

  it('should switch token layers when a control is clicked', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const buttons = el.querySelectorAll<HTMLButtonElement>('.layer-button');

    buttons[1].click();
    fixture.detectChanges();

    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(el.querySelector('.token-path')?.textContent).toContain('semantic.primary');
    expect(el.querySelectorAll('.semantic-list > div').length).toBe(3);
  });

  it('should render a live PrimeNG component sample', async () => {
    const fixture = TestBed.createComponent(DesignerPreviewCard);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.component-sample p-button')).toBeTruthy();
    expect(el.querySelector('#sample-theme-name')).toBeTruthy();
    expect(el.querySelector('.component-sample p-tag')).toBeTruthy();
  });
});
