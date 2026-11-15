import { defineStore } from 'pinia'
import { Score } from '@/class/Score'

// Vue's way to load a json file that may not exist
const rankingFiles = import.meta.glob('/src/ranking.json', {
  eager: true,
  import: 'default',
})

// Glob expects multiple files
const rankingData = Object.values(rankingFiles)[0] ?? []

const STORAGE_KEY = 'concurso-musical-ranking'

function toScore(entry) {
  return new Score(entry.scoreId, entry.score, entry.player, entry.accuracy, entry.date)
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function loadScores() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed.map(toScore)
    }
  } catch (error) {
    console.error('Error loading ranking from localStorage', error)
  }

  return Array.isArray(rankingData) ? rankingData.map(toScore) : []
}

export const useRankingStore = defineStore('ranking', {
  state: () => ({
    scores: loadScores(),
  }),
  actions: {
    addScore(player, score, accuracy) {
      const scoreId = Math.max(0, ...this.scores.map((entry) => entry.scoreId)) + 1
      const entry = new Score(scoreId, score, player, accuracy, formatDate(new Date()))

      this.scores.push(entry)
      this.persist()

      return entry
    },
    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.scores))
      } catch (error) {
        console.error('Error saving ranking to localStorage', error)
      }
    },
  },
})
