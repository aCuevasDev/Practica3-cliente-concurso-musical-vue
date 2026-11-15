<template>
  <div class="card-container">
    <div class="audio--container">
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

        <div class="audio__track" aria-hidden="true"></div>
        <span class="audio__time">0s</span>
      </div>

      <p class="audio__caption">Reproducir fragmento de 5 segundos</p>
    </div>

    <div class="card">
      <div class="question">
        <h1 class="question__title">¿Qué canción es?</h1>
        <span v-if="correctAnswer" class="correct__answer"
          >{{ correctAnswer.text }} - {{ question.song.artist }}
        </span>
      </div>

      <ul class="answers">
        <li class="answers__item" v-for="answer in question.answers" :key="answer.text">
          <button
            class="answer"
            :class="answerStyleClass(answer)"
            type="button"
            :disabled="isAnswered"
            @click="emit('select-answer', answer)"
          >
            {{ answer.text }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Answer, Question } from '@/class/Question'
import { Howl } from 'howler'
import { computed } from 'vue'

const props = defineProps({
  question: { type: Question, required: true },
  correctAnswer: { type: Answer, default: null },
  selectedAnswer: { type: Answer, default: null },
})
const emit = defineEmits(['select-answer'])
const isAnswered = computed(() => props.correctAnswer !== null)

function answerStyleClass(answer) {
  if (!isAnswered.value) return null

  const isCorrect = answer === props.correctAnswer
  const isSelected = answer === props.selectedAnswer

  return {
    'answer--correct': isCorrect,
    'answer--wrong': isSelected && !isCorrect,
    'answer--dimmed': !isCorrect && !isSelected,
  }
}

// HOWL TODO IN PARENT
let howl
const volume = 100

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

.correct__answer {
  color: blueviolet;
  font-weight: bolder;
}

.answer--correct {
  background: #10b981;
  border-color: #046b49;
}
.answer--wrong {
  background: #ef4444;
  border-color: #990c0c;
}
.answer--dimmed {
  opacity: 0.5;
}

.card-container {
  margin-top: 16px;
  padding: 20px 21px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 22px 44px rgba(88, 12, 62, 0.18);
}
</style>
