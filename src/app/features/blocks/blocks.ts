import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeSwitcher } from '../landing/components/theme-switcher';
import { BlockCard } from './components/block-card';
import { SIDEBAR_BLOCKS } from './models/block-definition';

@Component({
  selector: 'app-blocks',
  standalone: true,
  imports: [RouterLink, BlockCard, ThemeSwitcher],
  templateUrl: './blocks.html',
  styleUrl: './blocks.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blocks {
  protected readonly blocks = SIDEBAR_BLOCKS;
}
