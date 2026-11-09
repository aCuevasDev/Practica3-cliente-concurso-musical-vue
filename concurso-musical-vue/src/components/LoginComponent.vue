<template>
  <main class="login">
    <section class="login__card" aria-labelledby="login-title">
      <div class="login__icon" aria-hidden="true">
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
      </div>

      <h1 id="login-title" class="login__title">¡Adivina la Canción!</h1>
      <p class="login__subtitle">Escucha fragmentos de 5 segundos y adivina el título correcto</p>

      <ol class="steps">
        <li class="step">
          <span class="step__number" aria-hidden="true">1</span>
          <span class="step__text">Escucha el fragmento de la canción</span>
        </li>
        <li class="step">
          <span class="step__number" aria-hidden="true">2</span>
          <span class="step__text">Elige la respuesta correcta entre 4 opciones</span>
        </li>
        <li class="step">
          <span class="step__number" aria-hidden="true">3</span>
          <span class="step__text">Gana 10 puntos por cada respuesta correcta</span>
        </li>
      </ol>

      <div class="field">
        <label class="field__label" for="player-name">Tu nombre</label>
        <svg
          class="field__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>

        <input
          id="player-name"
          class="field__input"
          v-model="username"
          type="text"
          placeholder="Introduce tu nombre"
          autocomplete="nickname"
          maxlength="20"
          autofocus
        />
      </div>

      <button class="login__button" @click="send" :disabled="!username.trim()">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polygon points="7 4 20 12 7 20 7 4"></polygon>
        </svg>
        Comenzar Juego
      </button>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/username-store'
import { useRouter } from 'vue-router'

const username = ref('')
const userStore = useUserStore()
const router = useRouter()

function send() {
  userStore.setUsername(username.value)
  router.push('/home')
  // location.href = '/home'
}
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 57px);
  padding: 48px 24px;
  background: linear-gradient(135deg, #a21caf 0%, #db2777 50%, #f97316 100%);
}

.login__card {
  width: 100%;
  max-width: 360px;
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(76, 5, 25, 0.22);
  text-align: center;
}

.login__icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin: 0 auto;
  border-radius: 50%;
  color: #ffffff;
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  box-shadow: 0 10px 22px rgba(190, 24, 93, 0.28);
}

.login__icon svg {
  width: 30px;
  height: 30px;
}

.login__title {
  margin: 16px 0 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #1f2937;
}

.login__subtitle {
  max-width: 280px;
  margin: 8px auto 0;
  font-size: 13px;
  line-height: 1.45;
  color: #6b7280;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
  text-align: left;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step__number {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  color: #9333ea;
  background: #f3e8ff;
}

.step__text {
  font-size: 13px;
  line-height: 1.35;
  color: #374151;
}

.login__form {
  margin-top: 24px;
  text-align: left;
}

.field__label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
}

.field {
  position: relative;
  display: flex;
  align-items: center;
}

.field__icon {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: #9ca3af;
  pointer-events: none;
}

.field__input {
  width: 100%;
  min-height: 38px;
  padding: 8px 12px 8px 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  color: #1f2937;
  background: #f9fafb;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.field__input::placeholder {
  color: #9ca3af;
}

.field__input:focus {
  outline: none;
  border-color: #a855f7;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.18);
}

.login__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 40px;
  margin-top: 16px;
  padding: 0 20px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  box-shadow: 0 8px 18px rgba(219, 39, 119, 0.24);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.login__button svg {
  width: 16px;
  height: 16px;
  flex: none;
}

.login__button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(219, 39, 119, 0.3);
}

.login__button:active:not(:disabled) {
  transform: translateY(0);
}

.login__button:focus-visible {
  outline: 2px solid #db2777;
  outline-offset: 3px;
}

.login__button:disabled {
  opacity: 0.5;
  box-shadow: none;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .login {
    padding: 32px 18px;
  }

  .login__card {
    padding: 24px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .field__input,
  .login__button {
    transition: none;
  }

  .login__button:hover:not(:disabled) {
    transform: none;
  }
}
</style>
