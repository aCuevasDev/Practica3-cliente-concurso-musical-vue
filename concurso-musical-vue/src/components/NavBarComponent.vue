<template>
    <header class="nav">
        <div class="container nav__inner">
            <RouterLink to="/" class="brand">
                <span class="logo">Music Logo</span> Adivina la canción
            </RouterLink>

            <nav class="links">
                <RouterLink to="/home" class="link" :class="{ active: $route.name === 'home' }">
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
    <RouterView />
</template>

<script setup></script>

<style scoped></style>