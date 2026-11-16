export class Answer {
  constructor(text, isCorrect = false) {
    this.text = text
    this.isCorrect = isCorrect
  }
}

export class Question {
  /** @param {Song} song*/
  constructor(questionId, song, answers = []) {
    this.questionId = questionId
    /**@property {Song} song (I miss typescript)**/
    this.song = song
    /** @param {Answer[]} answers */
    this.answers = answers
  }
}
