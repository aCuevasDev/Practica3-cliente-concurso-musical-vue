import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSongStore = defineStore('song', {
  state: () => ({
    /**@property {Song[]} songs **/
    songs: [],
    /**@property {Question[]} questions **/
    questions: [],
  }),
  getters: {
    isSongsLoaded: (state) => Boolean(state.songs.length > 0 && state.questions.length > 0),
  },
  actions: {
    clear: () => {
      this.songs = []
      this.questions = []
    },
    onSongsLoaded: () => {},
    setSongs: (songs) => {
      this.songs = songs
    },
    setQuestions: (questions) => {
      this.questions = questions
    },
  },
})
