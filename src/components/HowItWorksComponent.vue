<template>
  <section class="how">
    <div class="how__inner">
      <h2 class="how__title">¿Cómo funciona?</h2>
      <p class="how__subtitle">
        Un juego simple pero adictivo que pondrá a prueba tus conocimientos musicales
      </p>

      <div class="steps">
        <article class="step">
          <span class="step__icon step__icon--listen" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </span>
          <h3 class="step__title">Escucha</h3>
          <p class="step__text">Reproduce un fragmento de 5 segundos de una canción popular</p>
        </article>

        <article class="step">
          <span class="step__icon step__icon--guess" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </span>
          <h3 class="step__title">Adivina</h3>
          <p class="step__text">Elige la respuesta correcta entre 4 opciones posibles</p>
        </article>

        <article class="step">
          <span class="step__icon step__icon--compete" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m3 7 4.5 4L12 4l4.5 7L21 7l-1.8 9H4.8L3 7z"></path>
              <path d="M5 20h14"></path>
            </svg>
          </span>
          <h3 class="step__title">Compite</h3>
          <p class="step__text">Gana 10 puntos por respuesta correcta y sube en el ranking</p>
        </article>
      </div>
    </div>
  </section>

  <div class="stats">
    <div class="stats__inner">
      <div class="stat">
        <span class="stat__value">10</span>
        <span class="stat__label">Preguntas por partida</span>
      </div>
      <div class="stat">
        <span class="stat__value">100</span>
        <span class="stat__label">Puntos máximos</span>
      </div>
      <div class="stat">
        <span class="stat__value">5s</span>
        <span class="stat__label">Por canción</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.how {
  padding: 80px 24px 72px;
  background: #ffffff;
}

.how__inner {
  max-width: 1160px;
  margin: 0 auto;
  text-align: center;
}

.how__title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #111827;
}

.how__subtitle {
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.5;
  color: #6b7280;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 56px;
}

.step {
  padding: 24px;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  background: #ffffff;
}

.step__icon {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  margin: 0 auto 32px;
  border-radius: 50%;
}

.step__icon svg {
  width: 26px;
  height: 26px;
}

.step__icon--listen {
  color: #9200fa;
  background: #eddcff;
}

.step__icon--guess {
  color: #e4006d;
  background: #fcd5eb;
}

.step__icon--compete {
  color: #f53c00;
  background: #ffddb4;
}

.step__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  color: #111827;
}

.step__text {
  margin: 24px 0 0;
  font-size: 14px;
  line-height: 1.45;
  color: #4b5563;
}

.stats {
  padding: 64px 24px;
  background: linear-gradient(135deg, #960bf9 0%, #e40072 50%, #f54300 100%);
  color: #ffffff;
}

.stats__inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1160px;
  margin: 0 auto;
  text-align: center;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat__value {
  font-size: 44px;
  font-weight: 400;
  line-height: 1.1;
}

.stat__label {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .how {
    padding: 56px 18px 48px;
  }

  .step {
    padding: 22px 20px;
  }

  .stats {
    padding: 48px 18px;
  }

  .stats__inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
