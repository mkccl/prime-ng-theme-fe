import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { HelpDialog, HELP_CONTENT } from './help-dialog';

@Component({
  standalone: true,
  imports: [HelpDialog],
  template: `<design-help-dialog [(helpVisible)]="visible" />`,
})
class TestHost {
  visible = signal(false);
}

describe('HelpDialog', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: TestHost;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should render dialog when visible', () => {
    host.visible.set(true);
    fixture.detectChanges();

    const dialog = document.querySelector('.p-dialog');
    expect(dialog).toBeTruthy();
  });

  it('should display all categories when no search query', () => {
    host.visible.set(true);
    fixture.detectChanges();

    const headers = document.querySelectorAll('p-accordion-header');
    expect(headers.length).toBe(HELP_CONTENT.length);
  });

  it('should filter content based on search query', () => {
    host.visible.set(true);
    fixture.detectChanges();

    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = 'Primitive';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const headers = document.querySelectorAll('p-accordion-header');
    expect(headers.length).toBeGreaterThan(0);
    expect(headers.length).toBeLessThan(HELP_CONTENT.length);
  });

  it('should show empty state for no-match query', () => {
    host.visible.set(true);
    fixture.detectChanges();

    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = 'xyznonexistentquery123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const emptyState = document.querySelector('.pi-search');
    const accordion = document.querySelector('p-accordion');
    expect(emptyState).toBeTruthy();
    expect(accordion).toBeFalsy();
  });
});
