import { Question } from '@/class/Question'
import { Song } from '@/class/Song'
import js from '@eslint/js'

export const SONGS_SRC = '@/songs.json'
export const QUESTIONS_SRC = '@/questions.json'

export async function loadJson(src = SONGS_SRC) {
  try {
    const response = await fetch(src)
    if (!response.ok) {
      throw new Error(`Failed to load ${src}: ${response.status} ${response.statusText}`)
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error loading songs json file.', error)
  }
}
