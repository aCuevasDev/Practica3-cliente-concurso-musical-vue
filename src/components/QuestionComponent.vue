<template>
  <button
    class="play"
    type="button"
    aria-label="Reproducir fragmento de la canción"
    @click="playSong"
  >
    PLAY PLACEHOLDER
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
      class="audio_icon"
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

    <div class="audio_track" aria-hidden="true"></div>
    <span class="audio_time">0s</span>
  </div>

  <p class="audio__caption">Reproducir fragmento de 5 segundos</p>

  <div class="question">
    <h1 class="question_title">¿Qué canción es?</h1>
    <!-- <p class="question__song">Rolling in the Deep <span class="question__artist">- Adele</span></p> -->
  </div>

  <ul class="answers">
    <li class="answers_item" v-for="answer in answers" :key="answer">
      <button class="answer" type="button">{{ answer }}</button>
    </li>
  </ul>

  <button class="next" type="button">Siguiente Pregunta</button>
</template>

<script setup>
import { useSongStore } from '@/stores/song-store'
import { Howl } from 'howler'
const volume = 100
const songStore = useSongStore()

let answers = songStore.questions

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

<style scoped>
.audio_icon {
  width: 50px;
}
</style>
