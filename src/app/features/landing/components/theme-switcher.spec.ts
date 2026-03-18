import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { ThemeSwitcher } from './theme-switcher';

describe('ThemeSwitcher', () => {
  let component: ThemeSwitcher;
  let fixture: ComponentFixture<ThemeSwitcher>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcher],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trigger button with cog icon', () => {
    const btn = el.querySelector('.switcher-trigger');
    expect(btn).toBeTruthy();
    const icon = btn?.querySelector('.pi-cog');
    expect(icon).toBeTruthy();
  });

  it('should render primary color label', async () => {
    const btn = el.querySelector('.switcher-trigger') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const labels = document.querySelectorAll('.switcher-label');
    const primaryLabel = Array.from(labels).find((l) => l.textContent?.trim() === 'Primary');
    expect(primaryLabel).toBeTruthy();
  });

  it('should render surface color label', async () => {
    const btn = el.querySelector('.switcher-trigger') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const labels = document.querySelectorAll('.switcher-label');
    const surfaceLabel = Array.from(labels).find((l) => l.textContent?.trim() === 'Surface');
    expect(surfaceLabel).toBeTruthy();
  });

  it('should render preset label', async () => {
    const btn = el.querySelector('.switcher-trigger') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const labels = document.querySelectorAll('.switcher-label');
    const presetLabel = Array.from(labels).find((l) => l.textContent?.trim() === 'Preset');
    expect(presetLabel).toBeTruthy();
  });
});
