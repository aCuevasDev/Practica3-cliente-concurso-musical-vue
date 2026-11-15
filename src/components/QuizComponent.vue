<template>
  <section class="quiz" aria-label="Concurso musical">
    <div class="quiz__inner">
      <header class="game-header">
        <div class="game-header__brand">
          <span class="game-header__logo" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </span>

          <div class="game-header_player">
            <p class="game-header_title">Adivina la Canción</p>
            <p class="game-header_name">{{ username }}</p>
          </div>
        </div>

        <div class="score" aria-label="20 puntos">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="score__value">{{ score }} puntos</span>
        </div>
      </header>

      <div class="progress">
        <div class="progress__labels">
          <span class="progress__step"
            >Pregunta {{ questionNumber }} de {{ maxQuestionNumber }}</span
          >
          <span class="progress__percent">30%</span>
        </div>
        <div
          class="progress__track"
          role="progressbar"
          aria-label="Progreso del concurso"
          aria-valuemin="0"
          aria-valuemax="10"
          aria-valuenow="3"
        >
          <span class="progress__fill"></span>
        </div>
      </div>

      <article class="card">
        <QuestionComponent />
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user-store.js'
import QuestionComponent from './QuestionComponent.vue'

// TODO
import songs from '@/songs.json'
import questions from '@/questions.json'

const username = ref('')
const score = ref('')
const questionNumber = ref('')
const maxQuestionNumber = 10
const userStore = useUserStore()

// push questions already answered to array
const questionsDone = []

username.value = userStore.username
score.value = userStore.score
questionNumber.value = userStore.score
</script>

<style scoped>
.quiz {
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 57px);
  padding: 22px 16px 24px;
  background: linear-gradient(135deg, #9b17f8 0%, #f5329a 50%, #ff871e 100%);
}

.quiz__inner {
  width: 100%;
  max-width: 448px;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.game-header__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.game-header__logo {
  display: inline-flex;
  flex: none;
  color: #ffffff;
}

.game-header__logo svg {
  width: 24px;
  height: 24px;
}

.game-header__player {
  min-width: 0;
}

.game-header__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.15;
  color: #ffffff;
  white-space: nowrap;
}

.game-header__name {
  margin: 2px 0 0;
  overflow: hidden;
  font-size: 10.5px;
  line-height: 1.15;
  color: rgba(255, 255, 255, 0.78);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.score {
  display: inline-flex;
  align-items: center;
  flex: none;
  gap: 6px;
  min-height: 30px;
  padding: 0 11px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  color: #111827;
  background: #edeff2;
}

.score svg {
  width: 13px;
  height: 13px;
  flex: none;
}

.progress {
  margin-top: 16px;
}

.progress__labels {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  color: #ffffff;
}

.progress__track {
  height: 6px;
  margin-top: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.2);
}

.progress__fill {
  display: block;
  width: 30%;
  height: 100%;
  border-radius: inherit;
  background: #0b0b12;
}

.card {
  margin-top: 16px;
  padding: 20px 21px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 22px 44px rgba(88, 12, 62, 0.18);
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

.play svg {
  width: 18px;
  height: 18px;
  margin-left: 2px;
}

.play:hover {
  transform: scale(1.04);
  box-shadow: 0 12px 26px rgba(168, 85, 247, 0.42);
}

.play:focus-visible {
  outline: 2px solid #db2777;
  outline-offset: 3px;
}

.audio {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.audio__icon {
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
  line-height: 1;
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

.question__song {
  margin: 3px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.2;
  background: linear-gradient(90deg, #9333ea 0%, #db2777 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.question__artist {
  font-weight: 500;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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
  background: #f3f4f6;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.answer:hover {
  border-color: #c4c8cf;
  background: #eef0f3;
}

.answer:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

.answer--correct,
.answer--correct:hover {
  border-color: #3ed472;
  color: #1f2937;
  background: #dcfce7;
}

.answer--wrong,
.answer--wrong:hover {
  border-color: #f4565c;
  color: #1f2937;
  background: #ffe2e2;
}

.answer__icon {
  width: 15px;
  height: 15px;
  flex: none;
}

.answer--correct .answer__icon {
  color: #16a34a;
}

.answer--wrong .answer__icon {
  color: #ef4444;
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
  .quiz {
    padding: 18px 14px 22px;
  }

  .card {
    padding: 18px 16px;
    border-radius: 14px;
  }

  .question {
    margin-top: 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .play,
  .answer,
  .next {
    transition: none;
  }

  .play:hover {
    transform: none;
  }
}
</style>
