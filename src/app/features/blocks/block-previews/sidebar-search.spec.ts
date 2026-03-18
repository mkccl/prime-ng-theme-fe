import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { SidebarSearchPreview } from './sidebar-search';

describe('SidebarSearchPreview', () => {
  let component: SidebarSearchPreview;
  let fixture: ComponentFixture<SidebarSearchPreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSearchPreview],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarSearchPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search input', () => {
    const input = el.querySelector('input[pInputText]');
    expect(input).toBeTruthy();
  });

  it('should render 6 menu items by default', () => {
    const items = el.querySelectorAll('nav a');
    expect(items.length).toBe(6);
  });
});
