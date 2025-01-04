import { Component } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@Component({
  selector: 'app-root',
  imports: [MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private primeng: PrimeNG) {
    this.primeng.theme.set({
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    });
  }

  title = 'cms';
}
