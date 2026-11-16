<template>
  <section class="ranking" aria-labelledby="ranking-title">
    <div class="ranking__inner">
      <header class="ranking__header">
        <span class="ranking__icon" aria-hidden="true">
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
        </span>

        <h1 id="ranking-title" class="ranking__title">Tabla de Clasificación</h1>
        <p class="ranking__subtitle">Los mejores jugadores de todos los tiempos</p>
        <span class="ranking__badge">Top 10 Jugadores</span>
      </header>

      <div v-if="ranking.length === 0" class="empty">
        <svg
          class="empty__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
        </svg>

        <p class="empty__title">Aún no hay puntuaciones</p>
        <p class="empty__text">¡Sé el primero en aparecer en el ranking!</p>

        <RouterLink to="/play" class="empty__button">
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
          Jugar Ahora
        </RouterLink>
      </div>

      <template v-else>
        <ol class="ranking__list" aria-label="Top 10 jugadores">
          <RankingCardComponent
            v-for="(entry, index) in ranking"
            :key="entry.scoreId"
            :entry="entry"
            :position="index + 1"
            :is-current="isCurrentPlayer(entry)"
          />
        </ol>

        <p v-if="showTopTenMessage" class="ranking__note">
          No estás entre los 10 mejores. ¡Sigue jugando para entrar en el ranking!
        </p>
      </template>

      <div class="ranking__actions">
        <RouterLink to="/" class="button button--ghost">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          Volver al Inicio
        </RouterLink>

        <RouterLink to="/play" class="button button--primary">
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
          Jugar Ahora
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import RankingCardComponent from '@/components/RankingCardComponent.vue'
import { useRankingStore } from '@/stores/ranking-store'
import { useUserStore } from '@/stores/user-store'

const MAX_RANKING_ENTRIES = 10

const userStore = useUserStore()
const rankingStore = useRankingStore()

const ranking = computed(() =>
  rankingStore.scores
    .slice()
    .sort(
      (a, b) =>
        b.score - a.score || b.accuracy - a.accuracy || dateValue(b.date) - dateValue(a.date),
    )
    .slice(0, MAX_RANKING_ENTRIES),
)

const currentPlayerName = computed(() => userStore.username.trim().toLowerCase())

const currentPlayerInRanking = computed(() =>
  ranking.value.some(
    (entry) => entry.player.toLowerCase() === currentPlayerName.value.toLowerCase(),
  ),
)

const showTopTenMessage = computed(
  () =>
    Boolean(currentPlayerName.value) &&
    (userStore.questionsCorrect.length > 0 || userStore.questionsFailed.length > 0) &&
    !currentPlayerInRanking.value,
)

function isCurrentPlayer(entry) {
  return (
    Boolean(currentPlayerName.value) &&
    entry.player.toLowerCase() === currentPlayerName.value.toLowerCase()
  )
}

function dateValue(date) {
  const parsed = new Date(`${date}T00:00:00`)
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime()
}
</script>

<style scoped>
.ranking {
  min-height: calc(100vh - 57px);
  padding: 32px 24px 56px;
  background: linear-gradient(135deg, #f1dfff 0%, #fbddef 50%, #fee4dc 100%);
}

.ranking__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 588px;
  margin: 0 auto;
}

.ranking__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.ranking__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  color: #ffffff;
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  box-shadow: 0 8px 18px rgba(190, 24, 93, 0.28);
}

.ranking__icon svg {
  width: 24px;
  height: 24px;
}

.ranking__title {
  margin: 16px 0 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
  background: linear-gradient(90deg, #db2777 0%, #ec4899 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.ranking__subtitle {
  margin: 10px 0 0;
  font-size: 12px;
  line-height: 1.35;
  color: #4b5563;
}

.ranking__badge {
  margin-top: 12px;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;
  color: #ffffff;
  background: linear-gradient(90deg, #9333ea 0%, #db2777 100%);
  box-shadow: 0 4px 10px rgba(190, 24, 110, 0.18);
}

.ranking__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.ranking__note {
  width: 100%;
  margin: 14px 0 0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 10.5px;
  line-height: 1.4;
  color: #9d174d;
  text-align: center;
  background: #fdf2f8;
}

.empty {
  width: 100%;
  margin-top: 28px;
  padding: 48px 40px 28px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(76, 29, 146, 0.08);
  text-align: center;
}

.empty__icon {
  width: 44px;
  height: 44px;
  color: #d1d5db;
}

.empty__title {
  margin: 24px 0 0;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.3;
  color: #4b5563;
}

.empty__text {
  margin: 10px 0 0;
  font-size: 10px;
  line-height: 1.35;
  color: #9ca3af;
}

.empty__button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 30px;
  margin-top: 28px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  color: #ffffff;
  background: linear-gradient(90deg, #9333ea 0%, #db2777 100%);
  text-decoration: none;
  transition:
    filter 0.2s ease,
    box-shadow 0.2s ease;
}

.empty__button svg {
  width: 12px;
  height: 12px;
  flex: none;
}

.empty__button:hover {
  filter: brightness(1.05);
  box-shadow: 0 6px 16px rgba(190, 24, 110, 0.22);
}

.empty__button:focus-visible {
  outline: 2px solid #db2777;
  outline-offset: 2px;
}

.ranking__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 38px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 30px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.button svg {
  width: 12px;
  height: 12px;
  flex: none;
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}

.button:focus-visible {
  outline: 2px solid #db2777;
  outline-offset: 2px;
}

.button--ghost {
  color: #374151;
  background: #ffffff;
  border-color: #e5e7eb;
  box-shadow: 0 2px 8px rgba(76, 29, 146, 0.06);
}

.button--ghost:hover {
  color: #a21caf;
  border-color: #f0abfc;
  background: #fff7fb;
}

.button--primary {
  color: #ffffff;
  background: linear-gradient(135deg, #a21caf 0%, #e2007e 100%);
  box-shadow: 0 6px 14px rgba(190, 24, 110, 0.22);
}

.button--primary:hover {
  box-shadow: 0 8px 18px rgba(190, 24, 110, 0.28);
}

@media (max-width: 640px) {
  .ranking {
    padding: 28px 16px 48px;
  }

  .empty {
    padding: 40px 20px 24px;
  }

  .ranking__actions {
    flex-direction: column;
    width: 100%;
  }

  .button {
    width: 100%;
    max-width: 280px;
    min-height: 36px;
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .button,
  .empty__button {
    transition: none;
  }

  .button:hover {
    transform: none;
  }
}
</style>
