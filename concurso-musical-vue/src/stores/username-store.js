import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUsernameStore = defineStore('username', {
  state: () => ({
    username: '',
  }),
  actions: {
    setUsername: (username) => {
      this.username = username
    },
    clear: () => {
      this.username = ''
    },
  },
})
