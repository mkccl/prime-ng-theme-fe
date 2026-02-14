import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-designer-preview-card',
  standalone: true,
  templateUrl: './designer-preview-card.html',
  styleUrl: './designer-preview-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignerPreviewCard {}
