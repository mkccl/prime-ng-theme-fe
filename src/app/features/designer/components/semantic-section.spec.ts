import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';

import { SemanticSection } from './semantic-section';
import { ThemeDesignerService } from '../services/theme-designer.service';

@Component({
  standalone: true,
  imports: [SemanticSection],
  template: `<design-semantic-section [path]="path()" [root]="root()" />`,
})
class TestHost {
  path = signal('primary');
  root = signal(false);
}

describe('SemanticSection', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: TestHost;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);
    service.designer.update((prev) => ({
      ...prev,
      theme: {
        name: 'Test',
        preset: {
          semantic: {
            primary: {
              color: '#0070f3',
              inverseColor: '#ffffff',
              hoverColor: '#005bb5',
              nested: {
                deep: 'value',
              },
            },
          },
        },
        config: { fontSize: '14px', fontFamily: 'Inter var' },
      },
    }));

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(el.querySelector('design-semantic-section')).toBeTruthy();
  });

  it('should display section name when not root', () => {
    const heading = el.querySelector('.text-sm.font-semibold');
    expect(heading?.textContent?.trim()).toBe('Primary');
  });

  it('should not display section name when root', () => {
    host.root.set(true);
    fixture.detectChanges();
    // The root section itself should not show a heading, but nested sections still can
    const rootSection = el.querySelector('design-semantic-section > section');
    const directHeading = rootSection?.querySelector(':scope > .text-sm.font-semibold');
    expect(directHeading).toBeNull();
  });

  it('should render token fields for primitive values', () => {
    // The root level has: color, inverseColor, hoverColor (3 primitives)
    // Plus the nested section renders its own token field (deep: 'value')
    const tokenFields = el.querySelectorAll('design-token-field');
    expect(tokenFields.length).toBe(4);
  });

  it('should render nested sections recursively', () => {
    const nestedSections = el.querySelectorAll('design-semantic-section design-semantic-section');
    expect(nestedSections.length).toBe(1); // nested section
  });

  it('should filter colorScheme/light/dark from section name', () => {
    host.path.set('colorScheme.light.primary');
    fixture.detectChanges();
    const heading = el.querySelector('.text-sm.font-semibold');
    expect(heading?.textContent?.trim()).toBe('Primary');
  });

  it('should update designer service state when a token value changes', async () => {
    const input = el.querySelector('design-token-field input') as HTMLInputElement;
    expect(input).toBeTruthy();

    input.value = '#ff0000';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const semantic = service.designer().theme?.preset?.semantic as Record<string, unknown>;
    const primary = semantic['primary'] as Record<string, unknown>;
    expect(primary['color']).toBe('#ff0000');
  });
});
