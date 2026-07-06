# WXT Vue Starter

<p align="center">
  <img src="https://img.shields.io/badge/WXT-0.20.x-brightgreen" alt="WXT" />
  <img src="https://img.shields.io/badge/Vue-3.5.x-4fc08d" alt="Vue" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.x-3178c6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Pinia-3.x-f7d32c" alt="Pinia" />
  <img src="https://img.shields.io/badge/Element%20Plus-2.x-409eff" alt="Element Plus" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license" />
</p>

An enterprise-grade Chrome extension starter powered by **WXT + Vue 3 + TypeScript + Pinia + Element Plus**. Batteries included with best practices for real-world browser extension development.

[中文文档](./README_zh-CN.md)

---

## Features

- **WXT Framework** — First-class browser extension DX with HMR, auto-reload, and multi-browser support (Chrome & Firefox).
- **Vue 3 + Composition API** — Full TypeScript support with `<script setup>` syntax.
- **Multi-Entry SPA Architecture** — `popup`, `options`, and `sidepanel` each have their own **Vue Router** and **Pinia** instance, fully isolated.
- **Built-in WXT i18n** — Native `@wxt-dev/i18n` module, follows the browser locale. No extra i18n library needed.
- **Shared State via WXT Storage** — Cross-context state synchronization (popup / options / sidepanel / background) through `wxt/storage`.
- **Element Plus with Auto Import** — UI components and APIs are auto-imported on demand via `unplugin-vue-components` and `unplugin-auto-import`.
- **Dark Mode** — `system` / `light` / `dark` theme switching with VueUse's `usePreferredDark`, synced across all extension contexts.
- **Content Script with Shadow DOM** — Isolated Vue app mounted inside Shadow DOM, no style conflicts with host pages.
- **Type-Safe Messaging** — Typed message channel between content scripts and background service worker.
- **Complete DX Toolchain** — ESLint (`@antfu/eslint-config`), TypeScript strict mode, SCSS, conventional commits (`cz-git`), semantic versioning (`standard-version`).
- **CI/CD** — GitHub Actions auto-builds Chrome + Firefox zip artifacts on tag push and publishes to Release.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [WXT](https://wxt.dev/) (Web Extension Tools) |
| UI | [Vue 3](https://vuejs.org/) + [Element Plus](https://element-plus.org/) |
| State | [Pinia](https://pinia.vuejs.org/) (per-entry instance) |
| Routing | [Vue Router 4](https://router.vuejs.org/) (Hash mode, per-entry) |
| i18n | [@wxt-dev/i18n](https://wxt.dev/guide/i18n.html) (WXT native) |
| Storage | `wxt/storage` (cross-context sync) |
| Utilities | [VueUse](https://vueuse.org/) + [Lodash-es](https://lodash.com/) + [Day.js](https://day.js.org/) |
| HTTP | [Axios](https://axios-http.com/) |
| Styling | SCSS + Element Plus theme customization |
| Linting | [@antfu/eslint-config](https://github.com/antfu/eslint-config) |
| CI/CD | GitHub Actions |

---

## Project Structure

```
wxt-vue3-elementPlus-starter/
├── .github/workflows/          # CI/CD: lint + build + release
├── .vscode/                    # VSCode recommended extensions
├── assets/styles/              # Global SCSS: variables, dark mode, reset
├── components/                 # Shared Vue components
│   └── ContentFloatingWidget.vue  # Content script floating widget
├── composables/                # Vue composables
│   └── useDarkMode.ts          # Dark mode logic with Pinia + VueUse
├── entrypoints/                # Extension entry points
│   ├── background.ts           # Service Worker: storage management & message routing
│   ├── content.ts              # Content Script: Shadow DOM mount
│   ├── popup/                  # Popup SPA (own router + pinia)
│   │   ├── main.ts / App.vue / router.ts
│   │   ├── index.html
│   │   └── views/
│   ├── options/                # Options SPA (own router + pinia)
│   │   ├── main.ts / App.vue / router.ts
│   │   ├── index.html
│   │   └── views/
│   └── sidepanel/              # Side Panel SPA (own router + pinia)
│       ├── main.ts / App.vue / router.ts
│       ├── index.html
│       └── views/
├── lib/                        # Core libraries
│   ├── create-extension-app.ts # Unified Vue app factory
│   ├── element-plus.ts         # Element Plus locale resolver
│   └── i18n.ts                 # WXT i18n wrapper
├── locales/                    # i18n translation files
│   ├── en.json
│   └── zh-CN.json
├── public/icon/                # Extension icons (16/32/48/96/128)
├── stores/                     # Pinia stores (definitions shared, instances isolated)
│   └── app.ts                  # App state: theme, counter
├── utils/                      # Utilities
│   ├── messaging.ts            # Type-safe extension messaging
│   └── storage.ts              # WXT storage adapter & types
├── wxt.config.ts               # WXT configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint flat config
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 10 (recommended) or npm

### Install

```bash
pnpm install
```

This will also run `wxt prepare` automatically via `postinstall` to generate i18n types and WXT type declarations.

### Development

```bash
# Chrome (default)
pnpm dev

# Firefox
pnpm dev:firefox
```

After starting, load the extension in your browser:

| Browser | Steps |
|---------|-------|
| **Chrome** | Open `chrome://extensions` → Enable "Developer mode" → "Load unpacked" → Select `.output/chrome-mv3` |
| **Firefox** | Open `about:debugging#/runtime/this-firefox` → "Load Temporary Add-on" → Select `.output/firefox-mv3/manifest.json` |

### Build

```bash
# Chrome
pnpm build

# Firefox
pnpm build:firefox

# Build and zip both
pnpm zip
pnpm zip:firefox
```

Output is in the `.output/` directory.

---

## Architecture

### Independent Vue Apps per Entry

Each extension UI entry (`popup`, `options`, `sidepanel`) is a **fully independent SPA**:

| Entry | Router | Pinia | Description |
|-------|--------|-------|-------------|
| `popup` | Hash router (`/`, `/settings`) | Own instance | Lightweight popup window |
| `options` | Hash router (`/`, `/about`) | Own instance | Full-page settings |
| `sidepanel` | Hash router (`/`, `/tools`) | Own instance | Side panel dock |

This design ensures isolation — a navigation or state change in one entry never leaks into another.

### Cross-Context State Sync

Shared application state (theme, counter, etc.) is persisted through **WXT Storage** (`wxt/storage`). The background service worker acts as the source of truth, while each UI entry's Pinia store watches storage changes and stays in sync:

```
┌──────────┐   ┌──────────┐   ┌──────────┐
│  Popup   │   │ Options  │   │Sidepanel │
│ (Pinia)  │   │ (Pinia)  │   │ (Pinia)  │
└────┬─────┘   └────┬─────┘   └────┬─────┘
     │              │              │
     │  wxt/storage │              │
     └──────────────┼──────────────┘
                    │
            ┌───────┴───────┐
            │  Background   │
            │ (Service Wkr) │
            └───────────────┘
```

### i18n with WXT Native Module

Translations are defined in `locales/*.json` and follow the **browser's UI language**. No runtime language switching — WXT i18n maps to `chrome.i18n` / `browser.i18n` natively. The `manifest.json` references keys via `__MSG_keyName__`.

### Content Script Isolation

The content script mounts a Vue app inside **Shadow DOM** via `createShadowRootUi`, completely isolating styles from the host page. Communication with the background uses typed messages defined in `utils/messaging.ts`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Chrome) |
| `pnpm dev:firefox` | Start dev server (Firefox) |
| `pnpm build` | Build for production (Chrome) |
| `pnpm build:firefox` | Build for production (Firefox) |
| `pnpm zip` | Build and create .zip for Chrome |
| `pnpm zip:firefox` | Build and create .zip for Firefox |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm commit` | Interactive conventional commit (cz-git) |
| `pnpm release` | Bump version and generate CHANGELOG |

---

## Contributing

This project uses **conventional commits** with `cz-git` for standardized commit messages.

```bash
pnpm commit
```

Follow the prompts to select the type (`feat`, `fix`, `docs`, etc.) and scope. The commit message will be automatically formatted.

To release a new version:

```bash
pnpm release        # Auto-detect version bump
pnpm release:patch  # 0.0.x
pnpm release:minor  # 0.x.0
pnpm release:major  # x.0.0
```

This will:
1. Bump the version in `package.json`
2. Generate / update `CHANGELOG.md`
3. Create a git tag (`v*`)
4. Trigger the GitHub Actions release workflow

---

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (recommended extension auto-suggested in `.vscode/extensions.json`)

---

## License

[MIT](./LICENSE)
