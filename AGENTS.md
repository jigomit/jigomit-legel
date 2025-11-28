# Repository Guidelines

## Project Structure & Module Organization
Core source lives in `src/`, with `main.js` mounting the Vue 3 SPA and router exports from `src/router`. Feature scenes reside under `src/pages`, shared UI atoms/chrome live in `src/components`, and scroll helpers belong in `src/composables`. Keep marketing copy or stats in `src/data`, visual assets under `src/assets`, and drop static files in `public/`. Tests mirror their targets and sit beside components as `ComponentName.spec.ts`.

## Build, Test, and Development Commands
- `npm install`: install dependencies after cloning.
- `npm run dev`: launch Vite at `http://localhost:5173`; use it for day-to-day work and QA of all routes + theme toggles.
- `npm run build`: run `vite-ssg` to prerender and ensure SSG output compiles without errors.
- `npm run preview`: serve the production bundle locally; final QA should happen here.
- `npm outdated`: audit dependency upgrade opportunities before bumping packages.

## Coding Style & Naming Conventions
Use Vue `<script setup>` single-file components, two-space indentation, and single-quoted strings. Classes follow the global styles in `src/style.css` and stay kebab-case. Components/composables use PascalCase with `use` prefixes where appropriate (`CaseResultsGrid.vue`, `useTheme.js`). Favor relative imports (`../assets/logo.svg`) to keep bundles lean, and keep helpers near their consumers.

## Testing Guidelines
Manual QA is required for now: run `npm run dev`, browse every route, toggle dark/light themes, and verify Lenis scrolling without console warnings. Automated suites will rely on `vitest`; place specs beside sources (`ComponentName.spec.ts`) and keep coverage on critical flows before enabling CI gates.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits (`feat: add insights carousel`, `fix: debounce scroll observer`) capped at 72 characters with optional bodies for context. Every PR must link its issue, summarize visual/functional changes, attach before/after screenshots for UI edits, enumerate manual QA commands, and document new env vars or analytics hooks so reviewers can replicate configuration.

## Security & Configuration Tips
Do not hard-code secrets such as EmailJS keys or analytics tokens; read them from `import.meta.env` and update documentation when a new variable is introduced. Host fonts/media first-party when possible and vet embeds for GDPR/CCPA compliance. After any dependency change, rerun `npm run preview` to confirm the prerendered output remains healthy.
