import { Component } from '@angular/core';
import { PasswordGeneratorComponent } from './gerador-senha/gerador-senha.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PasswordGeneratorComponent],
  template: `
    <main>
      <app-gerador-senha></app-gerador-senha>
    </main>
  `,
  styles: [`
    main {
      padding: 1rem;
    }
  `]
})
export class AppComponent {}