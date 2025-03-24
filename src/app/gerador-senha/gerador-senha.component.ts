import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerador-senha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="generator-container">
      <div class="card">
        <div class="card-header">
          <h1>Gerador de Senhas</h1>
        </div>

        <div class="card-body">
          <!--Comprimento-->
          <div class="form-group">
            <label for="length" class="form-label">
              Comprimento: <span class="length-value">{{ length() }}</span>
            </label>
            <div class="slider-container">
              <input type="range" id="length" min="4" max="32" [(ngModel)]="length" 
                     class="slider" (input)="updateLengthValue($event)">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Incluir:</label>
            <div class="options-grid">
              <label class="option-checkbox">
                <input type="checkbox" [(ngModel)]="useUppercase" checked>
                <span class="checkmark"></span>
                <span class="option-label">Maiúsculas (A-Z)</span>
              </label>
              <label class="option-checkbox">
                <input type="checkbox" [(ngModel)]="useLowercase" checked>
                <span class="checkmark"></span>
                <span class="option-label">Minúsculas (a-z)</span>
              </label>
              <label class="option-checkbox">
                <input type="checkbox" [(ngModel)]="useNumbers" checked>
                <span class="checkmark"></span>
                <span class="option-label">Números (0-9)</span>
              </label>
              <label class="option-checkbox">
                <input type="checkbox" [(ngModel)]="useSpecialChars">
                <span class="checkmark"></span>
                <span class="option-label">Especiais (!#%)</span>
              </label>
            </div>
          </div>

          <button class="generate-btn" (click)="generatePassword()">
            Gerar Senha
          </button>
        </div>

        <!-- Resultado -->
        <div class="result-container" *ngIf="generatedPassword()">
          <div class="password-display">
            <span>{{ generatedPassword() }}</span>
            <button class="copy-btn" (click)="copyToClipboard()" title="Copiar senha">
              <span class="copy-icon">Copiar</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
    }

    .generator-container {
      max-width: 500px;
      margin: 0 auto;
    }

    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .card-header {
      padding: 1.5rem;
      background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
      color: white;
      text-align: center;
    }

    .card-header h1 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .card-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .length-value {
      display: inline-block;
      width: 2rem;
      text-align: center;
      font-weight: bold;
      color: #3a5a9f;
    }

    .slider {
      width: 100%;
      height: 8px;
      -webkit-appearance: none;
      appearance: none;
      background: #e0e0e0;
      border-radius: 4px;
      outline: none;
      margin-bottom: 0.5rem;
    }

    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.8rem;
    }

    .option-checkbox {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      user-select: none;
    }

    .option-checkbox input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      height: 18px;
      width: 18px;
      background-color: #eee;
      border-radius: 4px;
      margin-right: 8px;
      transition: all 0.2s;
    }

    .option-checkbox:hover input ~ .checkmark {
      background-color: #ddd;
    }

    .option-checkbox input:checked ~ .checkmark {
      background-color: #3a5a9f;
    }

    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    .option-checkbox input:checked ~ .checkmark:after {
      display: block;
    }

    .option-checkbox .checkmark:after {
      left: 6px;
      top: 3px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .option-label {
      font-size: 0.9rem;
    }

    .generate-btn {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .generate-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(107, 115, 255, 0.3);
    }

    .result-container {
      padding: 1.5rem;
      background: #f8f9fa;
      border-top: 1px solid #eee;
    }

    .password-display {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      border: 1px solid #ddd;
      padding: 1rem;
      font-size: 1.2rem;
    }

    .copy-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #3a5a9f;
      font-size: 1.2rem;
      padding: 0.2rem;
      border-radius: 4px;
    }

  `]
})
export class PasswordGeneratorComponent {
  length = signal<number>(12);
  useUppercase = signal<boolean>(true);
  useLowercase = signal<boolean>(true);
  useNumbers = signal<boolean>(true);
  useSpecialChars = signal<boolean>(false);
  generatedPassword = signal<string>('');

  private uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private numberChars = '0123456789';
  private specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  updateLengthValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.length.set(parseInt(target.value));
  }

  generatePassword(): void {
    let chars = '';
    
    if (this.useUppercase()) chars += this.uppercaseChars;
    if (this.useLowercase()) chars += this.lowercaseChars;
    if (this.useNumbers()) chars += this.numberChars;
    if (this.useSpecialChars()) chars += this.specialChars;
    
    if (!chars) {
      alert('Selecione pelo menos um do tipo!');
      return;
    }
    
    let password = '';
    const array = new Uint32Array(this.length());
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < this.length(); i++) {
      password += chars[array[i] % chars.length];
    }
    
    this.generatedPassword.set(password);
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPassword())
      .then(() => {
        console.log('Senha copiada!');
      })
  }

}