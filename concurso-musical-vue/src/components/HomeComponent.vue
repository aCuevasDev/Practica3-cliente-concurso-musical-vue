<template>
  <main class="main">
    <span class="new-game-badge">
      <svg
        id="newGameSvg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"></path>
      </svg>
      ¡Nuevo Juego!
    </span>

    <p class="subtitle">¿Cuánto sabes de música?</p>

    <p class="description">
      Pon a prueba tu conocimiento musical. Escucha fragmentos de 5 segundos y adivina la canción
      correcta entre 4 opciones. ¡Compite por las mejores puntuaciones!
    </p>

    <div class="actions">
      <a href="play" class="button button-primary">
        <svg
          id="playSvg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="7 4 20 12 7 20 7 4"></polygon>
        </svg>
        Comenzar a Jugar
      </a>

      <a href="ranking" class="button button-secondary">
        <svg
          id="rankingSvg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M8 21h8"></path>
          <path d="M12 17v4"></path>
          <path d="M7 4h10l-1 8a4 4 0 0 1-8 0z"></path>
          <path d="M7 6H4v3a4 4 0 0 0 4 4"></path>
          <path d="M17 6h3v3a4 4 0 0 1-4 4"></path>
        </svg>
        Ver Ranking
      </a>
    </div>

    <div class="headphones-circle" aria-label="Auriculares musicales">
      <!-- Headphones SVG -->
      <svg id="headphoneSvg" viewBox="0 0 64 64" role="img" aria-hidden="true">
        <path d="M10 34V29a22 22 0 0 1 44 0v5"></path>

        <path d="M10 33h8a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5z"></path>

        <path d="M54 33h-8a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h3a5 5 0 0 0 5-5z"></path>
      </svg>
    </div>
  </main>
</template>

<script setup></script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 57px);
  padding: 64px 24px 80px;
  text-align: center;
  background: linear-gradient(135deg, #f1dfff 0%, #fbddef 50%, #fee4dc 100%);
}

.new-game-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  color: #a21caf;
  background:
    linear-gradient(#fdf2f8, #fdf2f8) padding-box,
    linear-gradient(135deg, #a855f7 0%, #ec4899 100%) border-box;
}

.new-game-badge svg {
  width: 14px;
  height: 14px;
  flex: none;
}

.subtitle {
  margin: 18px 0 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  background: linear-gradient(90deg, #db2777 0%, #ec4899 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.description {
  max-width: 620px;
  margin: 26px 0 0;
  font-size: 17px;
  line-height: 1.5;
  color: #6b7280;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 32px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 40px;
  padding: 0 24px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.button svg {
  width: 16px;
  height: 16px;
  flex: none;
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}

.button:focus-visible {
  outline: 2px solid #db2777;
  outline-offset: 3px;
}

.button-primary {
  color: #ffffff;
  background: linear-gradient(135deg, #9333ea 0%, #db2777 100%);
  box-shadow: 0 10px 22px rgba(219, 39, 119, 0.28);
}

.button-primary:hover {
  box-shadow: 0 14px 28px rgba(219, 39, 119, 0.34);
}

.button-secondary {
  color: #374151;
  background: #ffffff;
  border-color: #e5e7eb;
  box-shadow: 0 4px 12px rgba(76, 29, 146, 0.06);
}

.button-secondary:hover {
  color: #a21caf;
  background: #fff7fb;
  border-color: #f0abfc;
}

.headphones-circle {
  display: grid;
  place-items: center;
  width: 248px;
  height: 248px;
  margin-top: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  box-shadow: 0 24px 42px rgba(190, 24, 93, 0.22);
}

.headphones-circle svg {
  width: 140px;
  height: 140px;
  fill: none;
  stroke: #ffffff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 768px) {
  .main {
    padding: 48px 20px 64px;
  }

  .subtitle {
    font-size: 22px;
  }

  .description {
    font-size: 16px;
  }

  .headphones-circle {
    width: 210px;
    height: 210px;
    margin-top: 44px;
  }

  .headphones-circle svg {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 40px 18px 56px;
  }

  .new-game-badge {
    padding: 4px 12px;
    font-size: 11px;
  }

  .subtitle {
    font-size: 20px;
  }

  .description {
    font-size: 15px;
  }

  .actions {
    width: 100%;
    flex-direction: column;
  }

  .button {
    width: 100%;
    max-width: 280px;
  }

  .headphones-circle {
    width: 168px;
    height: 168px;
    margin-top: 36px;
  }

  .headphones-circle svg {
    width: 96px;
    height: 96px;
  }
}
</style>
