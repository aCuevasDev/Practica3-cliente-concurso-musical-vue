import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    score: 0,
    questionsCorrect: [],
    questionsFailed: [],
  }),
  getters: {
    isUserLoggedIn: (state) => Boolean(state.username.trim()),
    totalQuestions: (state) =>
      state.questionsCorrect.length + state.questionsFailed.length,
  },
  actions: {
    setUsername(username) {
      this.username = username
      this.resetProgress()
    },
    clear() {
      this.username = ''
      this.resetProgress()
    },
    resetProgress() {
      this.score = 0
      this.questionsCorrect = []
      this.questionsFailed = []
    },
    addCorrectQuestion(question) {
      this.questionsCorrect.push(question)
    },
    addFailedQuestion(question) {
      this.questionsFailed.push(question)
    },
  },
})
