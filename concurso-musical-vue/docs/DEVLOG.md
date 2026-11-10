# Dev Log — Musical Quiz (Práctica 3)

Running log of what I did each day on this project. One entry per working day, newest first.
Two purposes: getting back up to speed quickly after a break, and giving the assistant reliable
material to summarize when I ask for it.

## Latest summary

_Updated 2026-11-10 · replaced on every run._

**Source:** `concurso-musical-vue/docs/DEVLOG.md`
**Period:** 2026-11-10 · 1 entry
**What you did:**
- Added `docs/DEVLOG.md` with the three previous working days reconstructed from `git log`.
- Added the global `/resumen` command (`~/.config/opencode/commands/resumen.md`) so the log can be
  found from any project and summarized for today, the week or a date range.
**Blockers / open issues:**
- `src/services/json.js`: `fetch('@/songs.json')` uses a Vite alias as a runtime URL, so it 404s;
  JSON loading is unverified.
- `song-store.clear` is an arrow function (`this` breaks it); `username-store` initialises numbers
  to `Number` instead of `0`.
- Score is neither accumulated nor persisted, and `RankingView` is still a placeholder.
**Next step:**
- Use the log at the end of every session, before closing the editor.

## How to use

- One entry per working day, heading format: `## YYYY-MM-DD — Short title`.
- Write it at the end of the session, 2–5 minutes max. If it isn't remembered, it isn't written.
- Link commits by short hash so the entry can be cross-checked with `git log`.
- Sections: **Goal / Done / Decisions / Blockers / Next / Commits**. Drop the ones that are empty.
- Recurring problems go to [Known issues / backlog](#known-issues--backlog) at the bottom, not
  repeated in every entry.
- To get a summary instead of re-reading this file, say "resume mi semana" or run
  `/resumen [period]`; it replaces the `## Latest summary` block above.

---

## 2026-11-10 — Set up the dev log

**Goal:** Have a written trace of daily work instead of relying on commit messages and memory.

**Done:**
- Added `docs/DEVLOG.md` with the three previous working days reconstructed from `git log`.
- Added the global command `~/.config/opencode/commands/resumen.md` so `/resumen` (today, week,
  or a date range) locates this log from any project and returns a short summary of it.

**Next:**
- Use it at the end of every session, before closing the editor.

---

## 2026-11-09 — Login flow, cards/questions, JSON data layer

**Goal:** Turn the static home screen into a real game flow: log in, land on a protected route,
render questions and answers from data instead of hardcoded markup.

**Done:**
- `LoginComponent.vue` finished and wired to `username-store` (`setUsername`, `clear`,
  `isUserLoggedIn` getter).
- Router guards: `meta.requiresLogin` on `/`, `/play`, `/ranking` plus a `beforeEach` that
  redirects to `/login?redirect=<target>`.
- New presentational pieces: `CardComponent.vue` (song card) and `QuestionComponent.vue`
  (question + answer buttons); `QuizComponent.vue` rewritten on top of them.
- Data layer: `src/questions.json` and `src/songs.json`, `services/json.js` fetch loader,
  and model classes `Question.js` (with `Answer`, plus a per-session `isUsedThisSession` flag)
  and `Song.js`.
- State: `stores/quiz-store.js` was dropped in favour of `stores/song-store.js` (holds `songs`
  and `questions`); `RankingView.vue` scaffolding added.
- `.vscode/launch.json` for debugging.

**Decisions / why:**
- Data lives in local JSON for now, so the game works without a backend while the UI is built.
- Question repeats are avoided in memory (`isUsedThisSession`) instead of by shuffling the file.

**Blockers:**
- The JSON loading path is not verified in the browser yet (see backlog, `json.js`).

**Next:**
- Connect `song-store` to the quiz: load JSON on mount, drive question order from it.
- Compute score and progress for real (currently placeholder values).

**Commits:** `0d7e09e` wip: questions and quiz · `908c78b` wip: login, cards, questions

---

## 2026-11-05 — Audio player service + first QuizComponent

**Goal:** Play the song clips the quiz is based on, and get a first version of the game screen.

**Done:**
- `services/player.js`: thin wrapper around Howler — `playSong`, `togglePlayPause`,
  `toggleMute` with `aria-pressed` sync, next/previous with wraparound at the ends of the list,
  and a 250 ms interval (`REFRESH_INTERVAL_MS`) to report progress.
- First `QuizComponent.vue` iteration; `PlayView.vue` reduced to rendering it.
- Installed/used `howler` as the audio dependency.

**Decisions / why:**
- Howler instead of a bare `<audio>` element: consistent behaviour across browsers and simpler
  seek/mute control.
- Player kept as a plain module (not a Pinia store) so it can be called from event handlers
  without extra reactivity.

**Next:**
- Feed the player the real song list and reflect playback state in the UI.

**Commits:** `6fd9d7e` #WIP adapt player for new exercise · `5d49c37` #WIP quizcomponent (illust 3)

---

## 2026-10-28 — Project setup, navbar/home, login store MVP

**Goal:** Scaffold the app and get the first navigable version of the assignment.

**Done:**
- Vue 3 + Vite project created, with ESLint + oxlint + Prettier config (`lint`, `format` scripts).
- Fixed the initial npm setup: dependencies and `node_modules` were created at the repository
  root instead of inside `concurso-musical-vue/`; removed the stray files and re-ran the CLI
  from the right folder.
- Added the assignment statement (`P1-Puntuable.docx`) and the default README.
- `NavBarComponent.vue` + `HomeComponent.vue` first working iteration, `HomeView`/`PlayView`
  routes, and design tokens in `assets/base.css`.
- `LoginComponent.vue`, `LoginView.vue`, `username-store.js` and `HowItWorksComponent.vue` as MVP.

**Decisions / why:**
- Pinia for the username: shared across navbar, quiz header and router guard without prop drilling.
- Design tokens in `base.css` before writing components, to keep the later screens consistent.

**Next:**
- Replace placeholder song list with real data (done on 2026-11-05/09).

**Commits:** `0463060` first commit · `3c11edd` fixed dependency/wrong path in cli ·
`5d99dd6` added documentation · `83886b8` NavBar and Home first working iteration ·
`49d9900` login wip, username-store, home and howitworks MVP

---

## Known issues / backlog

Checked against the code on 2026-11-10. These are the things to fix or verify next; delete the
line once it's done.

- [ ] `src/services/json.js`: `fetch('@/songs.json')` — the `@` alias works for Vite imports, not
      as a runtime URL, so the request will 404. Use `new URL('...', import.meta.url)` or a path
      under `public/`.
- [ ] `src/services/json.js`: stray `import js from '@eslint/js'`, unused. Error message also says
      "songs" even when loading questions.
- [ ] `src/stores/song-store.js`: `clear: () => { this.songs = [] }` — an arrow function, so `this`
      is not the store and the call throws. Use a normal method.
- [ ] `src/stores/username-store.js`: `score` and `questionNumber` initialised to `Number`
      (the constructor) instead of `0`.
- [ ] `src/router/index.js`: `logueado` is computed and never used.
- [ ] `src/components/QuizComponent.vue`: hardcoded `30%` and `aria-valuenow="3"`; if `score` is a
      `ref`, `{{ score.value }}` in the template renders `undefined` (templates auto-unwrap).
- [ ] Score is not accumulated or persisted anywhere; `RankingView.vue` is still a placeholder.
- [ ] `questions.json` repeats the question text on every entry and has no validation against the
      ids in `songs.json`.
