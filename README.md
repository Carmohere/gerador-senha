# Gerador de Senhas

Um gerador de senhas seguro desenvolvido com Angular.

![Screenshot do Gerador de Senhas](https://via.placeholder.com/800x500.png?text=Gerador+de+Senhas+Seguras)

## Funcionalidades

- Geração de senhas com comprimento configurável (4-32 caracteres)
- Opções de personalização:
  - Letras maiúsculas (A-Z)
  - Letras minúsculas (a-z)
  - Números (0-9)
  - Caracteres especiais (!#$%^&*)

### Pré-requisitos

- Node.js v16 ou superior
- npm v8 ou superior
- Angular CLI v14 ou superior

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Carmohere/gerador-senha
cd gerador-senha
```

2. Instale as dependências:
```
npm install
```
3. Inicie o servidor de desenvolvimento:
```
ng serve
```
4. Acesse no navegador:
```
http://localhost:4200
```

## Estrutura do Projeto

```text
gerador-senhas/
├── .editorconfig
├── .gitignore
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── README.md
├── angular.json
├── package.json
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   └── gerador-senha/
│   │       └── gerador-senha.component.ts
│   ├── index.html
│   └── styles.css
└── tsconfig.json