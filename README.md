# Tauri + Solid + Typescript

*This template should help get you started developing with Tauri, Solid and Typescript in Vite.*

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Project Structure Summary

- **Project Name**: NoteUp Lite
- **Description**: A lightweight note-taking application built with Tauri, utilizing modern web technologies.
- **Technology Stack**:
  - **Frontend**: Solid.js (a reactive UI library) with TypeScript (TSX)
  - **Backend**: Tauri (Rust-based framework for building desktop applications)
  - **Styling**: CSS

#### Key Files and Directories:
- **`README.md`**: Contains initial project information and setup instructions.
- **`package.json`**: Defines project dependencies and scripts for development, building, and serving the application.
  - **Dependencies** include:
    - `@solidjs/router`: For routing in Solid.js applications.
    - `@tauri-apps/api`: API for Tauri applications.
    - `motion`: For animations.
    - `prismjs`: For syntax highlighting.
- **`src/`**: Contains the main source code for the application.
  - **`App.tsx`**: Main application component that manages global settings and routing.
  - **`pages/`**: Contains different pages of the application, such as `home.tsx` for the home page and `settings.tsx` for settings.
  - **`components/`**: Contains reusable UI components like `PageContainer.tsx`.
- **`src-tauri/`**: Contains the Rust backend code for the Tauri application.
  - **`utils/document.rs`**: Provides functionality for reading and converting Markdown files to HTML.
- **`public/`**: Contains static assets for the application.
- **`node_modules/`**: Contains installed dependencies.
- **Configuration Files**:
  - **`vite.config.ts`**: Configuration for Vite, the build tool used in the project.
  - **`tsconfig.json`**: TypeScript configuration file.

## Project Dependencies: JavaScript Libraries and Rust Packages

### JavaScript Libraries
- **Dependencies**:
  - `@solidjs/router`: For routing in Solid.js applications.
  - `@tauri-apps/api`: API for Tauri applications.
  - `motion`: For animations.
  - `prismjs`: For syntax highlighting.
- **Dev Dependencies**:
  - `@tauri-apps/cli`: Tauri command line tool.
  - `@types/prismjs`: Type definitions for Prism.js.
  - `typescript`: TypeScript language support.
  - `vite`: Frontend build tool.
  - `vite-plugin-solid`: Vite plugin for Solid.js.

### Rust Packages
- **Dependencies**:
  - `tauri`: Core library for the Tauri framework.
- **Build Dependencies**:
  - `tauri-build`: Tauri build tool.