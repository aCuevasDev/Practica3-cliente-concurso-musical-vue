import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    score: Number,
    questionNumber: Number,
  }),
  getters: {
    isUserLoggedIn: (state) => Boolean(state.username.trim()),
  },
  actions: {
    setUsername(username) {
      this.username = username
      this.score = 0
      this.questionNumber = 0
    },
    clear() {
      this.username = ''
      this.score = 0
      this.questionNumber = 0
    },
  },
})
