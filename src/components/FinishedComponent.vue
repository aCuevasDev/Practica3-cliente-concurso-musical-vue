<template>
  <section class="finished" aria-labelledby="finished-title">
    <div class="finished__card">
      <div class="finished__trophy" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
        </svg>
      </div>

      <h1 id="finished-title" class="finished__title">{{ feedback.title }}</h1>
      <p class="finished__message">{{ feedback.message }}</p>

      <div class="summary">
        <p class="summary__label">Puntuación Final</p>
        <p class="summary__score">{{ score }}</p>
        <p class="summary__caption">de {{ MAX_SCORE }} puntos posibles</p>

        <div class="summary__stats">
          <div class="stat">
            <span class="stat__label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Correctas
            </span>
            <span class="stat__value">{{ correctAnswers }}</span>
          </div>

          <div class="stat">
            <span class="stat__label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                ></polygon>
              </svg>
              Precisión
            </span>
            <span class="stat__value">{{ accuracy }}%</span>
          </div>
        </div>
      </div>

      <p class="finished__banner">
        {{ displayName }}, respondiste correctamente <strong>{{ correctAnswers }}</strong> de
        {{ answeredQuestions }} preguntas
      </p>

      <button class="finished__button" type="button" @click="playAgain">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 2v6h6"></path>
          <path d="M3 8a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        </svg>
        Jugar de nuevo
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user-store.js'

const userStore = useUserStore()
const router = useRouter()

const displayName = computed(() => userStore.username || 'Jugador')
const score = computed(() => userStore.score)
const correctAnswers = computed(() => userStore.questionsCorrect.length)

const answeredQuestions = userStore.totalQuestions

const MAX_SCORE = answeredQuestions * 10

const accuracy = computed(() =>
  answeredQuestions ? Math.round((correctAnswers.value / answeredQuestions) * 100) : 0,
)

// Sí, esto lo ha hecho la IA pero me ha hecho gracia dejarlo
const feedback = computed(() => {
  if (accuracy.value >= 80) {
    return { title: '¡Excelente! 🎉', message: 'Tienes un gran conocimiento musical' }
  }
  if (accuracy.value >= 50) {
    return { title: '¡Buen trabajo! 👏', message: 'Tienes buen oído para la música' }
  }
  if (accuracy.value > 0) {
    return { title: '¡Sigue así! 💪', message: 'Con un poco más de práctica lo lograrás' }
  }
  return { title: '¡No te rindas! 🎵', message: 'La próxima vez te irá mejor' }
})

function playAgain() {
  userStore.resetProgress()
  router.push('/play')
}
</script>

<style scoped>
.finished {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 57px);
  padding: 40px 16px;
  background: linear-gradient(135deg, #9b17f8 0%, #f5329a 55%, #ff871e 100%);
}

.finished__card {
  width: 100%;
  max-width: 320px;
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 22px 44px rgba(88, 12, 62, 0.22);
  text-align: center;
}

.finished__trophy {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin: 0 auto;
  border-radius: 50%;
  color: #ffffff;
  background: linear-gradient(135deg, #34d399 0%, #059669 100%);
  box-shadow: 0 8px 18px rgba(5, 150, 105, 0.3);
}

.finished__trophy svg {
  width: 26px;
  height: 26px;
}

.finished__title {
  margin: 26px 0 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
  color: #374151;
}

.finished__message {
  margin: 12px 0 0;
  font-size: 11.5px;
  line-height: 1.45;
  color: #6b7280;
}

.summary {
  margin-top: 24px;
  padding: 14px;
  border-radius: 10px;
  background: #faf7fd;
}

.summary__label {
  margin: 0;
  font-size: 10px;
  font-weight: 600;
  color: #6b7280;
}

.summary__score {
  margin: 2px 0 0;
  font-size: 38px;
  font-weight: 800;
  line-height: 1.1;
  background: linear-gradient(90deg, #9333ea 0%, #db2777 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.summary__caption {
  margin: 0;
  font-size: 9.5px;
  line-height: 1.3;
  color: #9ca3af;
}

.summary__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 14px;
}

.stat {
  padding: 8px 4px;
  border-radius: 8px;
  background: #ffffff;
}

.stat__label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;
}

.stat:first-child .stat__label {
  color: #16a34a;
}

.stat:last-child .stat__label {
  color: #f59e0b;
}

.stat__label svg {
  width: 10px;
  height: 10px;
  flex: none;
}

.stat__value {
  display: block;
  margin-top: 3px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  color: #1f2937;
}

.finished__banner {
  margin: 18px 0 0;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 9.5px;
  line-height: 1.35;
  color: #6b7280;
  background: #f3f4f6;
}

.finished__banner strong {
  color: #374151;
}

.finished__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  min-height: 32px;
  margin-top: 18px;
  padding: 0 14px;
  border: none;
  border-radius: 8px;
  font-size: 10.5px;
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

.finished__button svg {
  width: 12px;
  height: 12px;
  flex: none;
}

.finished__button:hover {
  filter: brightness(1.04);
  box-shadow: 0 8px 20px rgba(190, 24, 110, 0.28);
}

.finished__button:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

@media (max-width: 480px) {
  .finished {
    padding: 28px 14px;
  }

  .finished__card {
    padding: 22px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .finished__button {
    transition: none;
  }
}
</style>
