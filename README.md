# BBBoards

A simple kanban board app built with React, TypeScript, and Vite.

## Running the app

```bash
npm install # install deps
npm run dev
```

## Features

- Standard Board features:
  - [x] List/Create boards
  - [x] Add column
  - [x] Move column (DnD)
  - [x] Rename column
  - [x] Delete empty column
  - [x] Create card
  - [x] Move card (DnD)
  - [x] Open card
  - [x] Update card details (name, description, status, archive)
- Testing:
  - [ ] Unit tests
  - [x] E2E tests (Cypress test)
  - [x] Graceful error handling (Error boundary with message)
- Other features:
  - [x] Multiple boards
  - [ ] i18n
  - [ ] More fields
- PWA:
  - [x] Install button (can install on desktop and mobile. [Netlify deploy for testing](https://master--comforting-moonbeam-7b5be7.netlify.app/))
  - [x] Persistted data to local storage
  - [ ] Push notification after creating card
- Performance:
  - [x] Windowing using react-window for cards in column
  - [x] Code splitting (lazy loading react-router pages)
- Design
  - [x] RWD (not perfect but works looks okay on small devices)
  - [x] Show description when list is empty (when boards list is empty)
  - [x] 404 page
- UX
  - [x] Auto focus on initial state (auto focus input when adding new items via dialogs)
  - [x] Input validation (when adding new items name is required/validated)

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
