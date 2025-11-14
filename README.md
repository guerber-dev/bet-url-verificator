# Bet ou Fake

Verifique se um link de casa de apostas é confiável e autorizado pelo Governo Brasileiro.

## Sobre

O **Bet ou Fake** é uma ferramenta gratuita que permite consultar rapidamente se um domínio ou link pertence a uma casa de apostas legalizada no Brasil. Basta colar o link ou domínio na barra de busca e o sistema informa se é autorizado, suspeito ou inválido.

- Consulta baseada em lista oficial do Governo Brasileiro.
- Interface simples e responsiva.
- Não coleta dados pessoais.
- Utiliza apenas métricas anônimas via Firebase Analytics.

## Como usar

1. Copie o link ou domínio que deseja verificar.
2. Cole na barra de busca da página inicial.
3. Clique em "Buscar" para ver o resultado.

## Resultados possíveis

- **Autorizado**: O domínio pertence a uma casa de apostas legalizada.
- **Suspeito**: O domínio não está na lista oficial.
- **Inválido**: O link ou domínio informado não é válido.

## Scripts

- `pnpm dev` — inicia o servidor de desenvolvimento com hot reload.
- `pnpm build` — gera a versão de produção na pasta `dist`.
- `pnpm preview` — faz preview local do build de produção.
- `pnpm test` — executa testes unitários e de integração.
- `pnpm test:ci` — executa todos os testes em modo CI.
- `pnpm test:e2e` — executa testes e2e com Playwright.
- `pnpm test:e2e:ci` — executa testes e2e headless.
- `pnpm format` — formata os arquivos com Biome.
- `pnpm lint` — verifica o código com TypeScript e Biome.
- `pnpm validate` — executa lint, testes e2e e unitários.

## Tecnologias

- [Vite 6](https://vitejs.dev) + [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Biome V2](https://biomejs.dev)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [Firebase Analytics](https://firebase.google.com/products/analytics)

## Privacidade

Este site não coleta dados pessoais. Apenas métricas anônimas de uso são registradas para aprimorar a experiência. Para mais detalhes, consulte a [Política de Privacidade](/lgpd).

## Estrutura do projeto

```
├── public/
│   ├── manifest.webmanifest
│   ├── mockServiceWorker.js
│   └── robots.txt
├── src/
│   ├── api/betsData.ts
│   ├── context/BettingCheckerContext.tsx
│   ├── pages/Home.tsx
│   ├── pages/lgpd.tsx
│   ├── shared/config/Analytics/Analytics.ts
│   ├── shared/config/firebase/
│   └── global.css
├── index.html
├── package.json
├── tailwind.config.cjs
└── ...
```
