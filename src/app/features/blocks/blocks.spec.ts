import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { Blocks } from './blocks';
import { SIDEBAR_BLOCKS } from './models/block-definition';

describe('Blocks', () => {
  let fixture: ComponentFixture<Blocks>;
  let component: Blocks;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blocks],
      providers: [provideRouter([]), providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(Blocks);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show UI Blocks heading', () => {
    const h1 = el.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('UI Blocks');
  });

  it('should render 10 block cards', () => {
    const cards = el.querySelectorAll('app-block-card');
    expect(cards.length).toBe(10);
  });

  it('should have a link to the designer page', () => {
    const link = el.querySelector('a[href="/designer"]');
    expect(link).toBeTruthy();
  });

  it('should render the theme switcher', () => {
    const switcher = el.querySelector('app-theme-switcher');
    expect(switcher).toBeTruthy();
  });

  it('should have 10 sidebar blocks in the data array', () => {
    expect(SIDEBAR_BLOCKS.length).toBe(10);
  });
});
