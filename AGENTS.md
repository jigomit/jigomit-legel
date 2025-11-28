# Repository Guidelines

## Project Structure & Module Organization
Core app code lives in `src/` with `main.js` mounting the Vue 3 SPA and router exports in `src/router`. Feature scenes sit under `src/pages`, shared UI pieces in `src/components`, scroll helpers in `src/composables`, and marketing copy or stats in `src/data`. Visual assets belong in `src/assets`, while static files (favicons, redirects) stay in `public/`. Co-locate tests with their targets as `ComponentName.spec.ts` beside each component or composable.

## Build, Test, and Development Commands
Use `npm install` after cloning to sync dependencies. `npm run dev` launches Vite on http://localhost:5173 for day-to-day work and QA. `npm run build` runs `vite-ssg` to prerender the SPA and should stay warning-free before opening PRs. `npm run preview` serves the production bundle to validate SSG output locally. Run `npm outdated` when reviewing dependency bumps.

## Coding Style & Naming Conventions
Author Vue SFCs with `<script setup>`, two-space indentation, and single-quoted strings. Classes follow the global styles in `src/style.css` and stay kebab-case. Components/composables use PascalCase (`CaseResultsGrid.vue`, `useTheme.js`), and imports should remain relative (`../assets/logo.svg`). Keep helpers near their consumers to avoid deep shared folders.

## Testing Guidelines
Manual QA is currently required: `npm run dev`, browse every route, toggle dark/light themes, and ensure Lenis scrolling is smooth without console warnings. Automated suites will rely on `vitest`, with specs mirrored beside sources (`ComponentName.spec.ts`). Focus coverage on critical flows before enabling CI gates.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits, e.g., `feat: add insights carousel` or `fix: debounce scroll observer`, capped at 72 characters with optional bodies for context. Every PR must link its issue, summarize visual/functional changes, attach before/after screenshots for UI edits, list manual QA (`npm run dev`, `npm run preview`), and document any new env vars or analytics hooks so reviewers can replicate configuration.

## Security & Configuration Tips
Never hard-code secrets such as EmailJS keys or analytics tokens; read them from `import.meta.env`. Host fonts and media first-party whenever possible, and vet embeds for GDPR/CCPA compliance. After changing dependencies or environment variables, rerun `npm run preview` to confirm SSG output remains healthy.
