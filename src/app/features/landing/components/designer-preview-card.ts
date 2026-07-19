import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';

type TokenLayer = 'primitive' | 'semantic' | 'component';

interface LayerOption {
  id: TokenLayer;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-designer-preview-card',
  standalone: true,
  imports: [Button, InputText, Tag],
  templateUrl: './designer-preview-card.html',
  styleUrl: './designer-preview-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignerPreviewCard {
  protected readonly activeLayer = signal<TokenLayer>('primitive');

  protected readonly layers: LayerOption[] = [
    {
      id: 'primitive',
      label: 'Primitive',
      icon: 'pi pi-palette',
      description: 'Raw palette values that establish the visual range.',
    },
    {
      id: 'semantic',
      label: 'Semantic',
      icon: 'pi pi-sitemap',
      description: 'Intent-driven roles shared across light and dark modes.',
    },
    {
      id: 'component',
      label: 'Component',
      icon: 'pi pi-box',
      description: 'Focused details for the interactions that matter most.',
    },
  ];

  protected selectLayer(layer: TokenLayer): void {
    this.activeLayer.set(layer);
  }
}
