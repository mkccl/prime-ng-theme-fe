import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CHANGELOG } from './changelog-data';

@Component({
  selector: 'app-changelog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './changelog.html',
  styleUrl: './changelog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Changelog {
  protected readonly entries = CHANGELOG;

  protected typeLabel(type: string): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}
