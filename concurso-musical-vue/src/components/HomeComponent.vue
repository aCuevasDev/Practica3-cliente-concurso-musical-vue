<template>
    <main class="main">

        <span class="new-game-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"></path>
            </svg>
            ¡Nuevo Juego!
        </span>

        <p class="subtitle">
            ¿Cuánto sabes de música?
        </p>

        <p class="description">
            Pon a prueba tu conocimiento musical. Escucha fragmentos
            de 5 segundos y adivina la canción correcta entre 4 opciones.
            ¡Compite por las mejores puntuaciones!
        </p>

        <div class="actions">

            <a href="#jugar" class="button button-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <polygon points="7 4 20 12 7 20 7 4"></polygon>
                </svg>

                Comenzar a Jugar
            </a>

            <a href="#ranking" class="button button-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
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
            <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
                <path d="M10 34V29a22 22 0 0 1 44 0v5"></path>

                <path d="M10 33h8a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5z"></path>

                <path d="M54 33h-8a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h3a5 5 0 0 0 5-5z"></path>
            </svg>
        </div>
    </main>
</template>