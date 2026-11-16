# Adivina la Canción

A music quiz SPA built with Vue 3. Listen to a 5-second clip, pick the right song from four options, and compete for a spot in the top 10.

**Live demo:** https://acuevasdev.github.io/Practica3-cliente-concurso-musical-vue/

## Features

- Nickname entry before playing; the name is shown during the game and saved with the score.
- Protected routes: home, game, ranking and results redirect to the login screen when no nickname is set.
- 10 random questions per game, drawn from the 11 available songs.
- Automatic 5-second clip from a random position in the song, with a play button, progress bar and elapsed time.
- Instant answer feedback: correct answer in green, wrong selection in red, correct option revealed.
- Score tracking: **+10** points for a correct answer, **−5** for a wrong one.
- Results screen with final score, number of correct answers, accuracy percentage and a feedback message.
- Top-10 ranking with podium icons, accuracy, date, and the current player highlighted.
- Ranking persisted in `localStorage`, seeded from `src/ranking.json` the first time.
- Responsive layout for desktop and mobile.

## Game rules

- Each game has 10 questions.
- Every question shows four options, only one of which is correct.
- The clip lasts 5 seconds and starts at a random point in the song.
- Correct answer: +10 points. Wrong answer: −5 points. Maximum score: 100.
- The ranking keeps the 10 best scores and sorts them by score, then accuracy, then date.
- If the player is not in the top 10, the ranking shows a message encouraging another attempt.

## Tech stack

| Tool        | Version   |
| ----------- | --------- |
| Vue         | ^3.5.42   |
| Vite        | ^8.2.2    |
| Vue Router  | ^5.3.1    |
| Pinia       | ^4.0.3    |
| Howler.js   | ^2.2.4    |
| ESLint      | ^10.10.0  |
| oxlint      | ~1.82.0   |
| Prettier    | 3.9.6     |

## Getting started

Requires Node `^22.18.0` or `>=24.12.0`.

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production build

```sh
npm run build
npm run preview
```

The build is configured for GitHub Pages under the base path `/Practica3-cliente-concurso-musical-vue/`.

### Lint and format

```sh
npm run lint
npm run format
```

`npm run lint` runs both oxlint and ESLint with autofix.

## Project structure

```
src/
├── class/            # Question, Answer and Score models
├── components/       # UI components (quiz, ranking, login, home...)
├── css/base.css      # global styles
├── router/index.js   # routes and login guard
├── services/         # MusicPlayer contract and Howler implementation
├── stores/           # Pinia stores (user and ranking)
├── views/            # route-level views
├── questions.json    # questions, options and correct answers
├── ranking.json      # initial ranking data
└── songs.json        # song metadata (title, author, files, duration)

public/
└── songs/            # audio files and cover art
```

## Routes

| Path       | Name     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `/`        | home     | Landing page with rules, stats and call to action |
| `/login`   | login    | Nickname entry                                    |
| `/play`    | play     | Game screen                                       |
| `/ranking` | ranking  | Top-10 leaderboard                                |
| `/finished` | finished | Results after the last question                   |

All routes except `/login` require a nickname.

## Data and persistence

- `src/songs.json` holds the song catalog: id, name, author, cover, audio file and duration.
- `src/questions.json` links each question to a `songId` and lists its four answers.
- `src/ranking.json` provides the initial scores used when no stored ranking exists.
- Scores are saved in the browser under the `concurso-musical-ranking` key in `localStorage`.

## Attributions

Music track: Vibing by Pufino
Source: https://freetouse.com/music
Free Music No Copyright (Safe)

Music track: Fantasy by Pufino
Source: https://freetouse.com/music
Vlog Music for Video (Free Download)

Music track: Avocado by Pufino
Source: https://freetouse.com/music
No Copyright Music for Video (Free)

Music track: Okay Energy by Aylex
Source: https://freetouse.com/music
Free To Use Music for Video

Music track: Carnival by Aylex
Source: https://freetouse.com/music
No Copyright Music for Video (Free)

Music track: Last Summer by Aylex
Source: https://freetouse.com/music
Background Music for Video (Free)

Music track: Follow The Sun by Luke Bergs & Waesto
Source: https://freetouse.com/music
Royalty Free Music for Videos (Safe)

Music track: Back Alley by Burgundy X
Source: https://freetouse.com/music
Free Background Music (No Copyright)

Music track: Funk Station by Tetuano
Source: https://freetouse.com/music
No Copyright Music (Free Download)

Music track: Dusty Roads by Calima
Source: https://freetouse.com/music
Free No Copyright Music Download

Music track: Sharp Stones by Dagored
Source: https://freetouse.com/music
Music for Video (Free Download)
