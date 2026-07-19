import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Step {
  number: string;
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="how-section">
      <div class="section-header fade-up" style="--delay: 0.1s">
        <div class="how-tag">How it works</div>
        <h2 class="how-title">From blank canvas to shipped theme in three steps</h2>
        <p class="how-subtitle">
          No CSS files to hand-edit. No build steps to wrangle. Just design, preview, and export.
        </p>
      </div>

      <div class="how-grid">
        @for (step of steps; track step.number; let i = $index) {
          <div class="how-step fade-up" style="--delay: {{ 0.15 + i * 0.1 }}s">
            <span class="how-step-number">{{ step.number }}</span>
            <div class="how-step-icon"><i class="pi {{ step.icon }}"></i></div>
            <h3 class="how-step-title">{{ step.title }}</h3>
            <p class="how-step-desc">{{ step.desc }}</p>
          </div>
        }
      </div>

      <div class="how-cta fade-up" style="--delay: 0.5s">
        <a routerLink="/designer" class="how-cta-link">Open the designer <i class="pi pi-arrow-right"></i></a>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .how-section {
      position: relative;
      z-index: 1;
      max-width: 1100px;
      margin: 0 auto;
      padding: 5rem 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .how-tag {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--p-primary-color);
      margin-bottom: 0.75rem;
    }

    .how-title {
      font-family: var(--font-display);
      font-size: 2.75rem;
      font-weight: 400;
      line-height: 1.15;
      margin: 0 0 1rem;
      color: var(--p-text-color);
    }

    .how-subtitle {
      font-size: 1.125rem;
      color: var(--p-text-muted-color);
      max-width: 560px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .how-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .how-step {
      position: relative;
      background: var(--p-content-background);
      border: 1px solid var(--p-content-border-color);
      border-radius: 16px;
      padding: 2rem;
      overflow: hidden;
      transition:
        transform 0.2s,
        box-shadow 0.2s,
        border-color 0.2s;
    }

    .how-step:hover {
      transform: translateY(-4px);
      border-color: color-mix(in srgb, var(--p-primary-color), transparent 65%);
      box-shadow: 0 16px 40px -12px color-mix(in srgb, var(--p-primary-color), transparent 80%);
    }

    .how-step-number {
      position: absolute;
      top: 1.1rem;
      right: 1.5rem;
      font-family: var(--font-display);
      font-size: 2.75rem;
      line-height: 1;
      color: color-mix(in srgb, var(--p-primary-color), transparent 80%);
    }

    .how-step-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--p-primary-color), transparent 88%);
      color: var(--p-primary-color);
      font-size: 1.25rem;
      margin-bottom: 1.25rem;
    }

    .how-step-title {
      font-size: 1.125rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
      color: var(--p-text-color);
    }

    .how-step-desc {
      font-size: 0.875rem;
      line-height: 1.65;
      color: var(--p-text-muted-color);
      margin: 0;
    }

    .how-cta {
      text-align: center;
      margin-top: 3rem;
    }

    .how-cta-link {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--p-primary-color);
      text-decoration: none;
      transition: gap 0.2s;
    }

    .how-cta-link:hover {
      gap: 0.625rem;
    }

    @media (max-width: 1024px) {
      .how-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .how-grid {
        grid-template-columns: 1fr;
      }

      .how-title {
        font-size: 2.25rem;
      }
    }
  `,
})
export class HowItWorks {
  protected readonly steps: Step[] = [
    {
      number: '01',
      icon: 'pi-palette',
      title: 'Pick a preset',
      desc: 'Start from Aura, Material, Lara, or Nora — each a complete, opinionated baseline you can build on.',
    },
    {
      number: '02',
      icon: 'pi-sliders-h',
      title: 'Tweak the tokens',
      desc: 'Adjust primitive colors, border radii, semantic mappings, and per-component overrides with a live preview.',
    },
    {
      number: '03',
      icon: 'pi-download',
      title: 'Export & ship',
      desc: 'Download a production-ready TypeScript preset and drop it straight into providePrimeNG. Done.',
    },
  ];
}
