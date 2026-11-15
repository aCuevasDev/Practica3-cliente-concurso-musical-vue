import { Howl } from 'howler'
import { MusicPlayer } from './MusicPlayer.js'

const DEFAULT_CLIP_DURATION_MS = 5000
const PROGRESS_INTERVAL_MS = 100

export class HowlerMusicPlayer extends MusicPlayer {
  #howl = null
  #clipDurationMs
  #volume = 1
  #stopTimer = null
  #progressTimer = null

  /**
   * @param {{
   *   onEnd?: Function,
   *   onError?: Function
   * }} [options]
   */
  constructor({ onPlay, onProgress, onEnd, onError } = {}) {
    this.#clipDurationMs = DEFAULT_CLIP_DURATION_MS
    this.onPlay = onPlay
    this.onEnd = onEnd
    this.onError = onError
    this.onProgress = onProgress
  }

  playClip(song) {
    this.destroy() // cancels any previous clip

    const howl = new Howl({
      src: [song.file],
      volume: this.#volume,
      onload: () => {
        if (this.#howl !== howl) return // a newer clip replaced this one
        this.#startClip(howl)
      },
      onplay: () => this.#onHowlerPlay(howl),
      onloaderror: (id, error) => this.onError?.(error),
      onplayerror: (id, error) => this.onError?.(error),
    })
    this.#howl = howl
  }

  #startClip(howl) {
    const clipSeconds = this.#clipDurationMs / 1000
    const maxStart = Math.max(0, howl.duration() - clipSeconds)
    const start = Math.random() * maxStart

    howl.seek(start)
    howl.play()
  }

  #onHowlerPlay(howl) {
    if (this.#howl !== howl) return // We called another howler before this one started playing

    this.#clearTimers()

    const startedAt = performance.now()
    this.#stopTimer = setTimeout(() => this.#finishClip(), this.#clipDurationMs)
    this.#progressTimer = setInterval(() => {
      const elapsed = Math.min(performance.now() - startedAt, this.#clipDurationMs) // Never above 5
      this.onProgress?.(elapsed)
    }, PROGRESS_INTERVAL_MS)
    this.onPlay?.()
  }

  #finishClip() {
    this.#clearTimers()
    this.#howl?.stop()
    this.onEnd?.()
  }

  #clearTimers() {
    clearTimeout(this.#stopTimer)
    clearInterval(this.#progressTimer)
    this.#stopTimer = null
    this.#progressTimer = null
  }

  setVolume(volume) {
    this.#volume = volume
    this.#howl?.volume(volume)
  }

  destroy() {
    this.#clearTimers()
    this.#howl?.unload()
    this.#howl = null
  }
}