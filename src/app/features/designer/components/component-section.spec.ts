import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';

import { ComponentSection } from './component-section';
import { ThemeDesignerService } from '../services/theme-designer.service';

@Component({
  standalone: true,
  imports: [ComponentSection],
  template: ` <design-component-section [componentKey]="componentKey()" [path]="path()" /> `,
})
class TestHost {
  componentKey = signal('button');
  path = signal('root');
}

describe('ComponentSection', () => {
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
          components: {
            button: {
              root: {
                borderRadius: '{content.border.radius}',
                paddingX: '1rem',
                paddingY: '0.5rem',
                iconColor: '{surface.500}',
                nested: {
                  deep: 'value',
                },
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
    expect(el.querySelector('design-component-section')).toBeTruthy();
  });

  it('should display section name', () => {
    const heading = el.querySelector('.text-sm.font-semibold');
    expect(heading?.textContent?.trim()).toBe('root');
  });

  it('should render token fields for string values', () => {
    const tokenFields = el.querySelectorAll(':scope > design-component-section design-token-field');
    expect(tokenFields.length).toBeGreaterThanOrEqual(4);
  });

  it('should detect color type for color-related keys', () => {
    // iconColor should have type="color" set
    const labels = el.querySelectorAll('label');
    const colorLabel = Array.from(labels).find((l) => l.textContent?.trim().includes('icon color'));
    expect(colorLabel).toBeTruthy();
  });

  it('should render nested sections', () => {
    const nestedSections = el.querySelectorAll('design-component-section design-component-section');
    expect(nestedSections.length).toBeGreaterThanOrEqual(1);
  });

  it('should filter colorScheme/light/dark from section name', () => {
    host.path.set('colorScheme.light.root');
    fixture.detectChanges();
    const heading = el.querySelector('.text-sm.font-semibold');
    expect(heading?.textContent?.trim()).toBe('root');
  });
});
