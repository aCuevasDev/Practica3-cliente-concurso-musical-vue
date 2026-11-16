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
  #clipId = null
  #clipStart = null

  /**
   * @param {{
   *   onEnd?: Function,
   *   onError?: Function
   * }} [options]
   */
  constructor({ clipDurationMs = DEFAULT_CLIP_DURATION_MS, onPlay, onProgress, onEnd, onError } = {}) {
    super()
    this.#clipDurationMs = clipDurationMs
    this.onPlay = onPlay
    this.onEnd = onEnd
    this.onError = onError
    this.onProgress = onProgress
  }

  playClip(song) {
    // Same song again: replay the same clip without reloading
    if (this.#howl && this.#clipId === song.id) {
      // If it's still loading, onload will start it, so ignore the extra click
      if (this.#howl.state() === 'loaded') this.#startClip(this.#howl)
      return
    }

    this.destroy()
    this.#clipId = song.id

    const howl = new Howl({
      src: [song.file],
      volume: this.#volume,
      onload: () => this.#onHowlerLoad(howl),
      onplay: () => this.#onHowlerPlay(howl),
      onloaderror: (id, error) => this.onError?.(error),
      onplayerror: (id, error) => this.onError?.(error),
      html5: true,
    })
    this.#howl = howl
  }

  #onHowlerLoad(howl) {
    if (this.#howl !== howl) return // a newer clip replaced this one

    const clipSeconds = this.#clipDurationMs / 1000
    const maxStart = Math.max(0, howl.duration() - clipSeconds)
    this.#clipStart = Math.random() * maxStart

    this.#startClip(howl)
  }

  #startClip(howl) {
    this.#clearTimers()   
    howl.stop()
    this.onProgress?.(0)  
    howl.seek(this.#clipStart)
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
    this.#clipId = null
    this.#clipStart = null
  }
}