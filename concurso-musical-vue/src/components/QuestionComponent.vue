<template>
  <button
    class="play"
    type="button"
    aria-label="Reproducir fragmento de la canción"
    @click="playSong"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polygon points="7 4 20 12 7 20 7 4"></polygon>
    </svg>
  </button>

  <div class="audio">
    <svg
      class="audio__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>

    <div class="audio__track" aria-hidden="true"></div>
    <span class="audio__time">0s</span>
  </div>

  <p class="audio__caption">Reproducir fragmento de 5 segundos</p>

  <div class="question">
    <h1 class="question__title">¿Qué canción es?</h1>
    <p class="question__song">Rolling in the Deep <span class="question__artist">- Adele</span></p>
  </div>

  <ul class="answers">
    <li class="answers__item">
      <button class="answer" type="button">Someone Like You</button>
    </li>
    <li class="answers__item" v-for="answer in answers">
      {{ item.message }}
    </li>
    <li>
      <button
        class="answer answer--wrong"
        type="button"
        aria-label="Set Fire to the Rain, respuesta incorrecta"
      >
        <span>Set Fire to the Rain</span>
        <svg
          class="answer__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </li>
    <li class="answers__item">
      <button class="answer" type="button">Hello</button>
    </li>
  </ul>

  <button class="next" type="button">Siguiente Pregunta</button>
</template>

<script setup>
import { Howl } from 'howler'
import { stringifyQuery } from 'vue-router'
const volume = 100

let answers = { name: String }

let howl

function playSong() {
  if (howl) howl.unload()
  let song = getRandomSong()

  howl = new Howl({
    src: song,
    volume: volume,
    onend: onSongEnd,
    onload: onHowlerLoaded,
    onloaderror: onHowlerLoadError,
    onplayerror: onHowlerPlayError,
  })
}

function getRandomSong() {}

function onSongEnd() {}

function onHowlerLoaded() {}

function onHowlerLoadError(id, error) {
  console.error(`Error loading audio (id ${id}):`, error)
}

function onHowlerPlayError(id, error) {
  console.error(`Error playing audio (id ${id}):`, error)
}
</script>

<style scoped></style>
