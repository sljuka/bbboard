# BBBoards

A simple kanban board app built with React, TypeScript, and Vite.

## Running the app

```bash
npm install # install deps
npm run dev
```

## Features

- List boards
- Create board
- Add column
- Move column (DnD)
- Delete empty column
- Create card
- Move card (DnD)
- Open card
- Update card details (name, description, status, archive)

Board data is stored in individual local storage entries. Cards in column are shown within a virtual list (react-window).

## e2e Testing

Run development server and open Cypress App:

```bash
npm run dev
npm run cypress:open
```

- Select E2E Testing in the Cypress App
- Select Chrome (perhaps other browsers work as well)
- Click Start E2E Testing in Chrome
- Click on bbboard.cy.js to run the e2e test

Run e2e test from command line:

```bash
npm run dev
npm run test
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
