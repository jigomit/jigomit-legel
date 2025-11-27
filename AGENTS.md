# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, where `main.js` mounts the Vue 3 app and attaches the router defined in `src/router`. Keep UI atoms and layouts inside `src/components`, page scenes in `src/pages`, and motion or scroll helpers in `src/composables`. Place icons, illustrations, and shared tokens inside `src/assets`, while all marketing copy and stats reside in `src/data`. Static files belong in `public/`, and `npm run build` writes the SSG output to `dist/`. Avoid editing `dist/` directly—treat it as a deployment artifact.

## Architecture Overview
This project is a Vite + Vue 3 single-page app exported through `vite-ssg`. Router routes map to files in `src/pages`, and shared layout chrome is handled by top-level components in `App.vue`. Smooth scrolling relies on Lenis, so any performance tweaks should pass through the composable that initializes it rather than scattered DOM calls.

## Build, Test, and Development Commands
Run `npm install` once per clone. Use `npm run dev` for the local Vite server at `http://localhost:5173` and manually check every route and theme toggle. Execute `npm run build` to prerender routes and hydrate Lenis/router scripts, then `npm run preview` to serve the production bundle. When touching dependencies, run `npm outdated` to see available upgrades.

## Coding Style & Naming Conventions
Stick to `<script setup>` with two-space indentation and single quotes for JavaScript strings. Keep CSS classes in kebab-case to align with `src/style.css`. Components/composables follow PascalCase (`CaseResultsGrid.vue`) and `use` prefixes (`useTheme.js`). Co-locate lightweight helper files near their consumers, and only introduce comments for non-obvious control flow. Use relative imports (`../assets/logo.svg`) to avoid Vite alias churn.

## Testing Guidelines
Automated tests are not yet wired; when introducing them, depend on `vitest` and place specs alongside the source as `ComponentName.spec.ts`. Until then, manual QA is required: run `npm run dev`, traverse every route, confirm dark/light styling, validate Lenis smooth scrolling, and watch the console for hydration warnings. Note these checks in PR descriptions so reviewers can reproduce.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits, e.g., `feat: add insights carousel` or `fix: debounce scroll observer`, limited to 72 characters with optional bodies for context. PRs must link to tracking issues, summarize functional or visual changes, attach before/after screenshots for UI tweaks, and list manual QA commands executed. Call out new env vars or analytics embeds explicitly so maintainers can verify configuration changes.

## Security & Configuration Tips
Never hard-code EmailJS keys or analytics tokens—use `import.meta.env` and document required variables in the PR. Review third-party embeds for GDPR/CCPA compliance and prefer first-party hosting for fonts and media. After dependency updates, rerun `npm outdated` and test `npm run preview` to ensure the SSG bundle stays healthy.
