import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user-store.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresLogin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('@/views/PlayView.vue'),
      meta: { requiresLogin: true },
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('@/views/RankingView.vue'),
      meta: { requiresLogin: true },
    },
    {
      path: '/finished',
      name: 'finished',
      component: () => import('@/views/FinishedView.vue'),
      meta: { requiresLogin: true },
    },
  ],
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.meta.requiresLogin && !userStore.isUserLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
