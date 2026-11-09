export class Answer {
  constructor(text, isCorrect = false) {
    this.text = text
    this.isCorrect = isCorrect
  }
}

export class Question {
  constructor(songId, answers = [], question = '¿Qué canción estás escuchando?') {
    this.songId = songId
    this.question = question
    this.answers = answers
    this.isUsedThisSession = false
  }
}
