import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSongStore = defineStore('song', {
  state: () => ({
    /**@property {Song[]} songs **/
    songs: [],
    /**@property {Question[]} questions **/
    questions: [],
  }),
  actions: {
    clear: () => {
      this.songs = []
      this.questions = []
    },
  },
})
