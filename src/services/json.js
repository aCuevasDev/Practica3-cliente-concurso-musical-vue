import { Question } from '@/class/Question'
import { Song } from '@/class/Song'
import { useSongStore } from '@/stores/song-store'
import js from '@eslint/js'

import songs from '@/songs.json'
import questions from '@/questions.json'

export const SONGS_SRC = '@/songs.json'
export const QUESTIONS_SRC = '@/questions.json'

/** @deprecated use import: import songs from '@/songs.json' */
export async function loadJson(src = SONGS_SRC) {
  try {
    const response = await fetch(src)
    if (!response.ok) {
      throw new Error(`Failed to load ${src}: ${response.status} ${response.statusText}`)
    }

    const json = await response.json()
    useSongStore().onSongsLoaded(json)
    return json
  } catch (error) {
    console.error('Error loading songs json file.', error)
  }
}

/** @deprecated */
export async function loadGameData() {
  const [songs, questions] = await Promise.all([loadJson(SONGS_SRC), loadJson(QUESTIONS_SRC)])
  return { songs: songs ?? [], questions: questions ?? [] }
}
