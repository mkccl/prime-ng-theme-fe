import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Step {
  number: string;
  icon: string;
  title: string;
  description: string;
  detail: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorks {
  protected readonly steps: Step[] = [
    {
      number: '01',
      icon: 'pi pi-palette',
      title: 'Choose a proven starting point',
      description:
        'Begin with Aura, Material, Lara, or Nora and keep the design language your team already trusts.',
      detail: 'Preset foundation',
    },
    {
      number: '02',
      icon: 'pi pi-sliders-h',
      title: 'Shape the token system',
      description:
        'Tune primitives, semantic roles, and component details while the live application responds beside you.',
      detail: 'Live visual editing',
    },
    {
      number: '03',
      icon: 'pi pi-download',
      title: 'Export, review, and ship',
      description:
        'Generate a production-ready TypeScript preset that fits directly into providePrimeNG and source control.',
      detail: 'Typed application code',
    },
  ];
}
