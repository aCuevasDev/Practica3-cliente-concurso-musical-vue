import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    score: Number,
    questionNumber: Number,
  }),
  actions: {
    addScore: (score) => {
      this.score += score
    },
    clear: () => {
      this.score = 0
      this.questionNumber = 0
    },
  },
})
