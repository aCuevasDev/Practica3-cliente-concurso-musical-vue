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

          <div class="game-header__player">
            <p class="game-header__title">Adivina la Canción</p>
            <p class="game-header__name">{{ username }}</p>
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
            >Pregunta {{ questionNumber }} de {{ MAX_QUESTIONS_NUMBER }}</span
          >
          <span class="progress__percent">{{ progressPercent }}%</span>
        </div>
        <div
          class="progress__track"
          role="progressbar"
          aria-label="Progreso del concurso"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="progressPercent"
        >
          <span class="progress__fill" :style="{ width: progressPercent + '%' }"></span>
        </div>
      </div>

      <QuestionComponent
        v-if="liveQuestion"
        :key="liveQuestion.questionId"
        :question="liveQuestion"
        :correct-answer="correctAnswer"
        :selected-answer="selectedAnswer"
        :elapsed-ms="elapsedMs"
        :clip-duration-ms="CLIP_DURATION_MS"
        :is-finished="isFinished"
        @select-answer="onAnswerSelect"
        @next-question="onNextQuestionClicked"
        @play-song="onPlaySongRequested"
        @finished="onQuizFinished"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRankingStore } from '@/stores/ranking-store.js'
import { useUserStore } from '@/stores/user-store.js'
import QuestionComponent from './QuestionComponent.vue'

import songs from '@/songs.json'
import questions from '@/questions.json'
import { Question } from '@/class/Question.js'
import { HowlerMusicPlayer } from '@/services/HowlerMusicPlayer.js'

const POINTS_PER_CORRECT_ANSWER = 10
const POINTS_PER_FAILED_ANSWER = 5
const MAX_QUESTIONS_NUMBER = 10
const CLIP_DURATION_MS = 5000

const username = ref('')
const score = ref(null)
const questionNumber = ref(0)
const liveQuestion = ref(null)
const correctAnswer = ref(null)
const selectedAnswer = ref(null)
const elapsedMs = ref(0)

const router = useRouter()
const userStore = useUserStore()
const rankingStore = useRankingStore()
let scoreSaved = false
const isFinished = computed(
  () => questionNumber.value === MAX_QUESTIONS_NUMBER && correctAnswer.value !== null,
)
const progressPercent = computed(() =>
  Math.round((questionNumber.value / MAX_QUESTIONS_NUMBER) * 100),
)

const questionsLinked = questions.map((question) => {
  question.song = songs.find((song) => song.id === question.songId)
  return new Question(question.questionId, question.song, question.answers)
})

const musicPlayer = new HowlerMusicPlayer({
  clipDurationMs: CLIP_DURATION_MS,
  onProgress: (ms) => (elapsedMs.value = ms),
  onError: (error) => console.error('Error playing song: ', error),
  onEnd: () => (elapsedMs.value = CLIP_DURATION_MS),
})

username.value = userStore.username
userStore.resetProgress()
score.value = 0
questionNumber.value = 0

onMounted(() => {
  setup()
})

onUnmounted(() => {
  musicPlayer.destroy()
})

function drawRandomQuestionFromPool() {
  const randomIndex = Math.floor(Math.random() * questionsLinked.length)
  const randomQuestion = questionsLinked.splice(randomIndex, 1).pop()
  return randomQuestion
}

function onNextQuestionClicked() {
  musicPlayer.destroy()
  elapsedMs.value = 0

  if (isFinished.value) return

  liveQuestion.value = drawRandomQuestionFromPool()
  questionNumber.value++
  correctAnswer.value = null
  selectedAnswer.value = null
  onPlaySongRequested()
}

/**  @param {Answer} answer */
function onAnswerSelect(answer) {
  if (correctAnswer.value !== null) return

  selectedAnswer.value = answer
  correctAnswer.value = liveQuestion.value.answers.find((answr) => answr.isCorrect)
  updateScore(answer)
}

function updateScore(answer) {
  if (answer.isCorrect) {
    userStore.addCorrectQuestion(liveQuestion.value)
    score.value += POINTS_PER_CORRECT_ANSWER
  } else {
    userStore.addFailedQuestion(liveQuestion.value)
    score.value -= POINTS_PER_FAILED_ANSWER
  }

  userStore.score = score.value
}

function setup() {
  onNextQuestionClicked()
  onPlaySongRequested()
}

function onPlaySongRequested() {
  musicPlayer.playClip(liveQuestion.value.song)
}

function onQuizFinished() {
  if (!scoreSaved) {
    const totalQuestions = userStore.totalQuestions
    const accuracy = totalQuestions
      ? Math.round((userStore.questionsCorrect.length / totalQuestions) * 100)
      : 0

    rankingStore.addScore(userStore.username, userStore.score, accuracy)
    scoreSaved = true
  }

  router.push('/finished')
}
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
  height: 100%;
  border-radius: inherit;
  background: #0b0b12;
}

@media (max-width: 520px) {
  .quiz {
    padding: 18px 14px 22px;
  }
}
</style>
