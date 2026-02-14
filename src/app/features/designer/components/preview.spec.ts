import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { DesignPreview } from './preview';

describe('DesignPreview', () => {
  let fixture: ComponentFixture<DesignPreview>;
  let component: DesignPreview;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignPreview],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render PrimeNG buttons', () => {
    const el = fixture.nativeElement as HTMLElement;
    const buttons = el.querySelectorAll('[data-pc-name="button"]');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should render table', () => {
    const el = fixture.nativeElement as HTMLElement;
    const table = el.querySelector('table');
    expect(table).toBeTruthy();
  });
});
