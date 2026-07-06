# WXT Vue Starter

<p align="center">
  <img src="https://img.shields.io/badge/WXT-0.20.x-brightgreen" alt="WXT" />
  <img src="https://img.shields.io/badge/Vue-3.5.x-4fc08d" alt="Vue" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.x-3178c6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Pinia-3.x-f7d32c" alt="Pinia" />
  <img src="https://img.shields.io/badge/Element%20Plus-2.x-409eff" alt="Element Plus" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license" />
</p>

基于 **WXT + Vue 3 + TypeScript + Pinia + Element Plus** 的企业级 Chrome 浏览器扩展脚手架。开箱即用，集成真实扩展开发所需的最佳实践。

[English](./README.md)

---

## 特性

- **WXT 框架** — 一流的浏览器扩展开发体验：HMR 热更新、自动重载、多浏览器支持（Chrome & Firefox）。
- **Vue 3 + Composition API** — 全面 TypeScript 支持，`<script setup>` 语法。
- **多入口独立 SPA 架构** — `popup`、`options`、`sidepanel` 各自拥有独立的 **Vue Router** 和 **Pinia** 实例，完全隔离。
- **WXT 原生 i18n** — 内置 `@wxt-dev/i18n` 模块，随浏览器语言自动适配，无需额外 i18n 库。
- **WXT Storage 跨上下文状态同步** — popup / options / sidepanel / background 之间通过 `wxt/storage` 实时同步共享状态。
- **Element Plus 按需自动导入** — 通过 `unplugin-vue-components` 和 `unplugin-auto-import` 实现组件和 API 的按需加载。
- **暗色模式** — 支持 `跟随系统` / `浅色` / `深色` 三种主题，基于 VueUse `usePreferredDark`，跨扩展上下文同步。
- **Content Script Shadow DOM 隔离** — 内容脚本在 Shadow DOM 内挂载独立 Vue 应用，与宿主页面样式完全隔离。
- **类型安全的消息通信** — Content Script 与 Background Service Worker 之间通过类型化消息进行通信。
- **完整的工程化工具链** — ESLint（`@antfu/eslint-config`）、TypeScript 严格模式、SCSS、规范化提交（`cz-git`）、语义化版本管理（`standard-version`）。
- **CI/CD** — GitHub Actions 在 tag 推送时自动 Lint、构建 Chrome + Firefox zip 产物并发布到 Release。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | [WXT](https://wxt.dev/)（浏览器扩展工具链） |
| UI | [Vue 3](https://vuejs.org/) + [Element Plus](https://element-plus.org/) |
| 状态管理 | [Pinia](https://pinia.vuejs.org/)（每个入口独立实例） |
| 路由 | [Vue Router 4](https://router.vuejs.org/)（Hash 模式，每个入口独立） |
| 国际化 | [@wxt-dev/i18n](https://wxt.dev/guide/i18n.html)（WXT 原生） |
| 持久存储 | `wxt/storage`（跨上下文同步） |
| 工具库 | [VueUse](https://vueuse.org/) + [Lodash-es](https://lodash.com/) + [Day.js](https://day.js.org/) |
| HTTP | [Axios](https://axios-http.com/) |
| 样式 | SCSS + Element Plus 主题定制 |
| 代码规范 | [@antfu/eslint-config](https://github.com/antfu/eslint-config) |
| CI/CD | GitHub Actions |

---

## 项目结构

```
wxt-vue3-elementPlus-starter/
├── .github/workflows/          # CI/CD：Lint + 构建 + 发布
├── .vscode/                    # VSCode 推荐扩展
├── assets/styles/              # 全局 SCSS：变量、暗色模式、样式重置
├── components/                 # 共享 Vue 组件
│   └── ContentFloatingWidget.vue  # 内容脚本浮动组件
├── composables/                # Vue 组合式函数
│   └── useDarkMode.ts          # 暗色模式逻辑（Pinia + VueUse）
├── entrypoints/                # 扩展入口点
│   ├── background.ts           # Service Worker：存储管理 & 消息路由
│   ├── content.ts              # Content Script：Shadow DOM 挂载
│   ├── popup/                  # Popup 单页应用（独立 Router + Pinia）
│   │   ├── main.ts / App.vue / router.ts
│   │   ├── index.html
│   │   └── views/
│   ├── options/                # Options 单页应用（独立 Router + Pinia）
│   │   ├── main.ts / App.vue / router.ts
│   │   ├── index.html
│   │   └── views/
│   └── sidepanel/              # Side Panel 单页应用（独立 Router + Pinia）
│       ├── main.ts / App.vue / router.ts
│       ├── index.html
│       └── views/
├── lib/                        # 核心库
│   ├── create-extension-app.ts # 统一 Vue 应用工厂函数
│   ├── element-plus.ts         # Element Plus 语言解析
│   └── i18n.ts                 # WXT i18n 封装
├── locales/                    # i18n 翻译文件
│   ├── en.json
│   └── zh-CN.json
├── public/icon/                # 扩展图标 (16/32/48/96/128)
├── stores/                     # Pinia Store（定义共享，实例隔离）
│   └── app.ts                  # 应用状态：主题、计数器
├── utils/                      # 工具函数
│   ├── messaging.ts            # 类型安全的扩展消息通信
│   └── storage.ts              # WXT storage 适配器与类型定义
├── wxt.config.ts               # WXT 配置
├── tsconfig.json               # TypeScript 配置
├── eslint.config.mjs           # ESLint flat config
└── package.json
```

---

## 快速开始

### 环境要求

- **Node.js** >= 18
- **pnpm** >= 10（推荐）或 npm

### 安装

```bash
pnpm install
```

安装完成后会自动执行 `wxt prepare`（通过 `postinstall`），生成 i18n 类型和 WXT 类型声明。

### 开发

```bash
# Chrome（默认）
pnpm dev

# Firefox
pnpm dev:firefox
```

启动后在浏览器中加载扩展：

| 浏览器 | 步骤 |
|--------|------|
| **Chrome** | 打开 `chrome://extensions` → 开启「开发者模式」→「加载已解压的扩展程序」→ 选择 `.output/chrome-mv3` |
| **Firefox** | 打开 `about:debugging#/runtime/this-firefox` →「临时载入附加组件」→ 选择 `.output/firefox-mv3/manifest.json` |

### 构建

```bash
# Chrome
pnpm build

# Firefox
pnpm build:firefox

# 构建并打包 zip
pnpm zip
pnpm zip:firefox
```

构建产物在 `.output/` 目录下。

---

## 架构设计

### 每个入口独立的 Vue 应用

扩展的每个 UI 入口（`popup`、`options`、`sidepanel`）都是一个**完全独立的单页应用**：

| 入口 | 路由 | Pinia | 说明 |
|------|------|-------|------|
| `popup` | Hash 路由（`/`、`/settings`） | 独立实例 | 轻量弹窗 |
| `options` | Hash 路由（`/`、`/about`） | 独立实例 | 全页设置 |
| `sidepanel` | Hash 路由（`/`、`/tools`） | 独立实例 | 侧边栏 |

这种设计确保隔离性 —— 某个入口的路由导航或状态变更不会影响其他入口。

### 跨上下文状态同步

共享的应用状态（主题、计数器等）通过 **WXT Storage**（`wxt/storage`）持久化。Background Service Worker 作为数据源，各 UI 入口的 Pinia Store 通过监听 storage 变化保持同步：

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

### WXT 原生 i18n

翻译文案定义在 `locales/*.json` 中，**随浏览器 UI 语言自动适配**。不支持运行时切换语言 —— WXT i18n 直接映射到 `chrome.i18n` / `browser.i18n`。`manifest.json` 中的名称和描述通过 `__MSG_keyName__` 引用翻译 key。

### Content Script 隔离

内容脚本通过 `createShadowRootUi` 在 **Shadow DOM** 中挂载 Vue 应用，与宿主页面样式完全隔离。与 Background 的通信使用 `utils/messaging.ts` 中定义的类型化消息。

---

## 脚本命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（Chrome） |
| `pnpm dev:firefox` | 启动开发服务器（Firefox） |
| `pnpm build` | 生产构建（Chrome） |
| `pnpm build:firefox` | 生产构建（Firefox） |
| `pnpm zip` | 构建并打包 Chrome .zip |
| `pnpm zip:firefox` | 构建并打包 Firefox .zip |
| `pnpm lint` | 运行 ESLint 检查 |
| `pnpm lint:fix` | 运行 ESLint 并自动修复 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm commit` | 交互式规范化提交（cz-git） |
| `pnpm release` | 升级版本并生成 CHANGELOG |

---

## 参与贡献

本项目使用 **规范化提交（Conventional Commits）** 配合 `cz-git` 工具。

```bash
pnpm commit
```

根据提示选择提交类型（`feat`、`fix`、`docs` 等）和影响范围，提交信息将自动格式化。

发布新版本：

```bash
pnpm release        # 自动检测版本升级类型
pnpm release:patch  # 补丁版本 0.0.x
pnpm release:minor  # 次版本 0.x.0
pnpm release:major  # 主版本 x.0.0
```

发布流程会自动：
1. 升级 `package.json` 中的版本号
2. 生成 / 更新 `CHANGELOG.md`
3. 创建 git tag（`v*`）
4. 触发 GitHub Actions 发布工作流

---

## 推荐 IDE 配置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（`.vscode/extensions.json` 已配置推荐扩展）

---

## 许可证

[MIT](./LICENSE)
