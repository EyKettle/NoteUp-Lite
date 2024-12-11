# Tauri + Solid + TypeScript

*此模板应帮助您开始使用 Tauri、Solid 和 TypeScript 在 Vite 中进行开发。*

## 推荐的 IDE 设置

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 项目结构摘要

- **项目名称**: NoteUp Lite
- **描述**: 一个轻量级的笔记应用程序，使用 Tauri 和现代 Web 技术构建。
- **技术栈**:
  - **前端**: Solid.js（一个响应式 UI 库）与 TypeScript（TSX）
  - **后端**: Tauri（基于 Rust 的桌面应用程序框架）
  - **样式**: CSS

#### 关键文件和目录:
- **`README.md`**: 包含初始项目信息和设置说明。
- **`package.json`**: 定义项目依赖关系和开发、构建及服务应用程序的脚本。
  - **依赖关系**包括:
    - `@solidjs/router`: 用于 Solid.js 应用程序中的路由。
    - `@tauri-apps/api`: Tauri 应用程序的 API。
    - `motion`: 用于动画。
    - `prismjs`: 用于语法高亮。
- **`src/`**: 包含应用程序的主要源代码。
  - **`App.tsx`**: 管理全局设置和路由的主要应用程序组件。
  - **`pages/`**: 包含应用程序的不同页面，例如 `home.tsx` 用于主页，`settings.tsx` 用于设置。
  - **`components/`**: 包含可重用的 UI 组件，如 `PageContainer.tsx`。
- **`src-tauri/`**: 包含 Tauri 应用程序的 Rust 后端代码。
  - **`utils/document.rs`**: 提供读取和转换 Markdown 文件为 HTML 的功能。
- **`public/`**: 包含应用程序的静态资产。
- **`node_modules/`**: 包含已安装的依赖项。
- **配置文件**:
  - **`vite.config.ts`**: Vite 的配置，Vite 是项目中使用的构建工具。

## 项目引用的 JS 库和 Rust 包

### JavaScript 库
- **依赖项**:
  - `@solidjs/router`: 用于 Solid.js 应用程序中的路由。
  - `@tauri-apps/api`: Tauri 应用程序的 API。
  - `motion`: 用于动画。
  - `prismjs`: 用于语法高亮。
- **开发依赖项**:
  - `@tauri-apps/cli`: Tauri 命令行工具。
  - `@types/prismjs`: Prism.js 的类型定义。
  - `typescript`: TypeScript 语言支持。
  - `vite`: 前端构建工具。
  - `vite-plugin-solid`: Solid.js 的 Vite 插件。

### Rust 包
- **依赖项**:
  - `tauri`: Tauri 框架的核心库。
- **构建依赖项**:
  - `tauri-build`: Tauri 构建工具。
