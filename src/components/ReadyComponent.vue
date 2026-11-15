<template>
  <section class="ready">
    <div class="ready__card">
      <svg
        class="ready__icon"
        id="crown"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>

      <h2 class="ready__title">¿Listo para el desafío?</h2>
      <p class="ready__text">Demuestra que eres un experto musical y alcanza el top del ranking</p>

      <RouterLink to="/play" class="ready__button">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polygon points="6 3 20 12 6 21 6 3"></polygon>
        </svg>
        Empezar Ahora
      </RouterLink>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.ready {
  padding: 72px 24px;
  background: linear-gradient(135deg, #fdf2f8 0%, #fef2f5 50%, #fff7ed 100%);
}

.ready__card {
  max-width: 780px;
  margin: 0 auto;
  padding: 44px 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #9c19f4 0%, #e2007e 100%);
  box-shadow: 0 24px 48px -12px rgba(76, 29, 146, 0.28);
  text-align: center;
  color: #ffffff;
}

.ready__icon {
  width: 52px;
  height: 52px;
}

.ready__title {
  margin: 24px 0 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
}

.ready__text {
  margin: 16px 0 0;
  font-size: 15px;
  line-height: 1.5;
}

.ready__button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  margin-top: 32px;
  padding: 0 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  color: #9200fa;
  background: #ffffff;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.ready__button svg {
  width: 14px;
  height: 14px;
  flex: none;
}

.ready__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.ready__button:active {
  transform: translateY(0);
}

.ready__button:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .ready {
    padding: 48px 18px;
  }

  .ready__card {
    padding: 32px 24px;
  }
}
</style>
