import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Splitter } from 'primeng/splitter';

import { ThemeDesignerService } from './services/theme-designer.service';
import { CreateTheme } from './components/create-theme';
import { DesignEditor } from './components/editor';
import { EditorFooter } from './components/editor-footer';
import { DesignPreview } from './components/preview';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [RouterLink, Splitter, CreateTheme, DesignEditor, EditorFooter, DesignPreview],
  templateUrl: './designer.html',
  styleUrl: './designer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Designer implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly designerService = inject(ThemeDesignerService);
  protected readonly activeView = computed(() => this.designerService.designer().activeView);
  protected readonly themeName = computed(
    () => this.designerService.designer().theme?.name ?? 'Theme Designer',
  );
  protected readonly isDark = signal(false);

  ngOnInit(): void {
    const themeParam = this.route.snapshot.queryParamMap.get('theme');
    if (themeParam) {
      this.designerService.importTheme(themeParam);
    }
  }

  protected toggleDarkMode(): void {
    this.isDark.update((v) => !v);
    document.documentElement.classList.toggle('p-dark');
  }

  protected backToCreate(): void {
    this.designerService.openCreateTheme();
  }
}
