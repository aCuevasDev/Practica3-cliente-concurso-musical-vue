/**
 * Contract for any music player implementation.
 * @abstract
 */
export class MusicPlayer {
  /**
   * Plays a short clip starting at a random position of the song.
   * @param {string} src
   */
  playClip(src) { throw new Error('Not implemented') }

  /** @param {number} volume value between 0 and 1 */
  setVolume(volume) { throw new Error('Not implemented') }

  /** Stops any playback and releases resources. */
  destroy() { throw new Error('Not implemented') }
}