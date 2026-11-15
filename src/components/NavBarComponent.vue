<template>
    <header class="nav">
        <div class="container nav__inner">
            <RouterLink to="/" class="brand">
                <span class="logo" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </span>

                <span class="brand__name">Adivina la Canción</span>
            </RouterLink>

            <nav class="links">
                <RouterLink to="/" class="link" :class="{ active: $route.name === 'home' }">
                    <span class="badge">Inicio</span>
                </RouterLink>

                <RouterLink to="/play" class="link" :class="{ active: $route.name === 'play' }">
                    Jugar
                </RouterLink>

                <RouterLink to="/ranking" class="link" :class="{ active: $route.name === 'ranking' }">
                    Ranking
                </RouterLink>
            </nav>
        </div>
    </header>
</template>

<script setup></script>

<style scoped>
.nav {
    position: sticky;
    top: 0;
    z-index: 20;
    background: #ffffff;
    border-bottom: 1px solid #eadcf2;
}

.nav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    max-width: 1160px;
    height: 56px;
    margin: 0 auto;
    padding: 0 24px;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    white-space: nowrap;
}

.logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex: none;
    border-radius: 10px;
    color: #ffffff;
    background: linear-gradient(135deg, #9333ea 0%, #db2777 100%);
    box-shadow: 0 6px 14px rgba(168, 85, 247, 0.32);
}

.logo svg {
    width: 20px;
    height: 20px;
}

.brand__name {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.01em;
    background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}

.links {
    display: flex;
    align-items: center;
    gap: 8px;
}

.link {
    display: inline-flex;
    align-items: center;
    padding: 9px 18px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.2;
    color: #1f2937;
    text-decoration: none;
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        box-shadow 0.2s ease;
}

.link:hover {
    color: #a21caf;
    background: #fdf2f8;
}

.link.active {
    color: #ffffff;
    background: linear-gradient(90deg, #9333ea 0%, #db2777 100%);
    box-shadow: 0 6px 16px rgba(219, 39, 119, 0.3);
}

.link.active:hover {
    color: #ffffff;
    background: linear-gradient(90deg, #9333ea 0%, #db2777 100%);
}

.link:focus-visible {
    outline: 2px solid #db2777;
    outline-offset: 2px;
}

@media (max-width: 640px) {
    .nav__inner {
        gap: 16px;
        padding: 0 16px;
    }

    .brand {
        gap: 8px;
    }

    .logo {
        width: 32px;
        height: 32px;
        border-radius: 9px;
    }

    .logo svg {
        width: 18px;
        height: 18px;
    }

    .brand__name {
        font-size: 16px;
    }

    .links {
        gap: 2px;
    }

    .link {
        padding: 8px 12px;
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .brand__name {
        display: none;
    }
}
</style>