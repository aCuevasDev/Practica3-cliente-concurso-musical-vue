<template>
  <div class="card-container">
    <div class="audio--container">
      <button
        class="play"
        type="button"
        aria-label="Reproducir fragmento de la canción"
        @click="emit('play-song')"
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

        <div class="audio_track" aria-hidden="true">
          <div class="audio_fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <span class="audio_time">{{ elapsedSeconds }}s</span>
      </div>

      <p class="audio__caption">Reproducir fragmento de 5 segundos</p>
    </div>

    <div class="card">
      <div class="question">
        <h1 class="question__title">¿Qué canción es?</h1>
        <span v-if="correctAnswer" class="correct__answer"
          >{{ correctAnswer.text }} - {{ question.song.author }}
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
      <button
        class="next"
        :disabled="correctAnswer === null || isFinished"
        :hidden="isFinished"
        @click="emit('next-question')"
      >
        Siguiente Pregunta
      </button>

      <button class="next" :disabled="!isFinished" :hidden="!isFinished" @click="emit('finished')">
        Finalizar
      </button>
    </div>
  </div>
</template>

<script setup>
import { Answer, Question } from '@/class/Question'
import { computed } from 'vue'

const props = defineProps({
  question: { type: Question, required: true },
  correctAnswer: { type: Answer, default: null },
  selectedAnswer: { type: Answer, default: null },
  elapsedMs: { type: Number, default: 0 },
  clipDurationMs: { type: Number },
  isFinished: { type: Boolean, default: false },
})
const emit = defineEmits(['select-answer', 'next-question', 'play-song', 'finished'])
const isAnswered = computed(() => props.correctAnswer !== null)
const progressPercent = computed(() =>
  Math.min(100, (props.elapsedMs / props.clipDurationMs) * 100),
)
const elapsedSeconds = computed(() => Math.floor(props.elapsedMs / 1000))

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
</script>

<style scoped>
.audio_track {
  flex: 1;
  height: 6px;
  overflow: hidden; /* clips the fill to the rounded track */
  border-radius: 999px;
  background: #e5e6ea;
}

.audio_fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #a855f7, #ec4899);
  transition: width 0.1s linear; /* smooths the 100ms steps */
}

.card-container {
  margin-top: 16px;
  padding: 26px 24px 30px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 22px 44px rgba(88, 12, 62, 0.18);
}

.card {
  padding: 0;
  background: transparent;
}

.audio--container {
  text-align: center;
}

.play {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  margin: 0 auto;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: #ffffff;
  background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
  box-shadow: 0 10px 22px rgba(168, 85, 247, 0.35);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.play:hover {
  transform: scale(1.04);
  box-shadow: 0 12px 26px rgba(168, 85, 247, 0.42);
}

.play:focus-visible {
  outline: 2px solid #db2777;
  outline-offset: 3px;
}

.play svg {
  width: 18px;
  height: 18px;
  margin-left: 2px;
}

.audio {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.audio_icon {
  width: 17px;
  height: 17px;
  flex: none;
  color: #6b7280;
}

.audio__track {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: #e5e6ea;
}

.audio__time {
  flex: none;
  font-size: 11px;
  color: #9ca3af;
}

.audio__caption {
  margin: 10px 0 0;
  font-size: 10.5px;
  line-height: 1.2;
  text-align: center;
  color: #9ca3af;
}

.question {
  margin-top: 42px;
  text-align: center;
}

.question__title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.25;
  color: #1f2937;
}

.correct__answer {
  display: block;
  margin-top: 3px;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.2;
  background: linear-gradient(90deg, #9333ea 0%, #db2777 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 31px 0 0;
  padding: 0;
  list-style: none;
}

.answers__item {
  margin: 0;
}

.answer {
  width: 100%;
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  text-align: left;
  color: #374151;
  background: #ffffff;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.answer:not(:disabled):hover {
  border-color: #c4c8cf;
  background: #f8f9fb;
  cursor: pointer;
}

.answer:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

.answer--correct {
  border-color: #3ed472;
  color: #1f2937;
  background: #dcfce7;
}

.answer--wrong {
  border-color: #f4565c;
  color: #1f2937;
  background: #ffe2e2;
}

.answer--dimmed {
  opacity: 0.5;
}

.next:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.next {
  width: 100%;
  min-height: 30px;
  margin-top: 31px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: #ffffff;
  background: linear-gradient(90deg, #9b16f6 0%, #e2007e 100%);
  box-shadow: 0 6px 16px rgba(190, 24, 110, 0.22);
  cursor: pointer;
  transition:
    filter 0.2s ease,
    box-shadow 0.2s ease;
}

.next:hover {
  filter: brightness(1.04);
  box-shadow: 0 8px 20px rgba(190, 24, 110, 0.28);
}

.next:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

@media (max-width: 520px) {
  .card-container {
    padding: 18px 16px 22px;
    border-radius: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .play,
  .answer {
    transition: none;
  }

  .play:hover {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .next {
    transition: none;
  }
}
</style>
