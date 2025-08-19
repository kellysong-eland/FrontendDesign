# Vue 3 + TypeScript + Vite

本專案已安裝並配置：
- **Bootstrap**：可直接於元件中使用 Bootstrap 樣式。
- **Material Symbols**：已於 index.html 透過 Google Fonts 引入，可直接於 HTML/Vue 中使用 `<span class="material-symbols-outlined">icon_name</span>`。

## 如何使用

### Bootstrap
直接於元件中使用 Bootstrap 樣式 class，例如：
```html
<button class="btn btn-primary">Bootstrap 按鈕</button>
```

### Material Symbols
直接於元件中插入：
```html
<span class="material-symbols-outlined">home</span>
```

## 啟動專案
```bash
npm install
npm run dev
```

---

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
