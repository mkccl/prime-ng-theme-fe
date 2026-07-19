import { Component, ChangeDetectionStrategy } from '@angular/core';
import { afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject as injectAnalytics } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  constructor() {
    afterNextRender(() => {
      injectAnalytics();
    });
  }
}
