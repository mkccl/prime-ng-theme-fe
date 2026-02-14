import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlockPreview } from './block-preview';
import { SIDEBAR_BLOCKS } from '../models/block-definition';

function fakeActivatedRoute(id: string) {
  return {
    paramMap: of({
      get: (key: string) => (key === 'id' ? id : null),
      has: (key: string) => key === 'id',
      getAll: () => [],
      keys: ['id'],
    }),
  };
}

describe('BlockPreview', () => {
  describe('with valid block ID', () => {
    let fixture: ComponentFixture<BlockPreview>;
    let el: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BlockPreview],
        providers: [
          provideRouter([]),
          providePrimeNG({ theme: { preset: Aura } }),
          { provide: ActivatedRoute, useValue: fakeActivatedRoute(SIDEBAR_BLOCKS[0].id) },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(BlockPreview);
      fixture.detectChanges();
      await fixture.whenStable();
      el = fixture.nativeElement as HTMLElement;
    });

    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render the preview wrapper', () => {
      const wrapper = el.querySelector('.block-preview-wrapper');
      expect(wrapper).toBeTruthy();
    });

    it('should not show not-found message', () => {
      const notFound = el.querySelector('.block-preview-not-found');
      expect(notFound).toBeNull();
    });
  });

  describe('with invalid block ID', () => {
    let fixture: ComponentFixture<BlockPreview>;
    let el: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BlockPreview],
        providers: [
          provideRouter([]),
          providePrimeNG({ theme: { preset: Aura } }),
          { provide: ActivatedRoute, useValue: fakeActivatedRoute('nonexistent-block') },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(BlockPreview);
      fixture.detectChanges();
      await fixture.whenStable();
      el = fixture.nativeElement as HTMLElement;
    });

    it('should show not-found message', () => {
      const notFound = el.querySelector('.block-preview-not-found');
      expect(notFound).toBeTruthy();
      expect(notFound?.textContent?.trim()).toBe('Block not found');
    });

    it('should not render the preview wrapper', () => {
      const wrapper = el.querySelector('.block-preview-wrapper');
      expect(wrapper).toBeNull();
    });
  });
});
