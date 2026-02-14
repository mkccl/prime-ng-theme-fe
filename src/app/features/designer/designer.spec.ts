import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { Designer } from './designer';
import { ThemeDesignerService } from './services/theme-designer.service';

describe('Designer', () => {
  let fixture: ComponentFixture<Designer>;
  let component: Designer;
  let el: HTMLElement;
  let service: ThemeDesignerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Designer],
      providers: [provideRouter([]), providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    service = TestBed.inject(ThemeDesignerService);

    fixture = TestBed.createComponent(Designer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Theme Designer heading in create view', () => {
    const h1 = el.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('Theme Designer');
  });

  it('should render the dark mode toggle button', () => {
    const darkBtn = el.querySelector('button[title="Toggle dark mode"]');
    expect(darkBtn).toBeTruthy();
  });

  it('should show create-theme component in create view', () => {
    const createTheme = el.querySelector('design-create-theme');
    expect(createTheme).toBeTruthy();
  });

  it('should not show back button in create view', () => {
    const backBtn = el.querySelector('button .pi-chevron-left');
    expect(backBtn).toBeNull();
  });

  it('should show placeholder text in preview area during create view', () => {
    const placeholder = el.querySelector('.pi-palette');
    expect(placeholder).toBeTruthy();
  });

  it('should import theme from query param on init', async () => {
    // Use a full Aura preset clone so the editor can render without errors
    const clonedPreset = structuredClone(Aura);
    const payload = {
      name: 'URL Theme',
      preset: clonedPreset,
      config: { fontSize: '14px', fontFamily: 'Inter var' },
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));

    const { ActivatedRoute } = await import('@angular/router');
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [Designer],
      providers: [
        provideRouter([]),
        providePrimeNG({ theme: { preset: Aura } }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: { get: (key: string) => (key === 'theme' ? encoded : null) },
            },
          },
        },
      ],
    }).compileComponents();

    const newService = TestBed.inject(ThemeDesignerService);
    const newFixture = TestBed.createComponent(Designer);
    newFixture.detectChanges();
    await newFixture.whenStable();

    expect(newService.designer().activeView).toBe('editor');
    expect(newService.designer().theme!.name).toBe('URL Theme');
  });
});
