import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'popup-home',
      component: () => import('./views/HomeView.vue'),
    },
    {
      path: '/settings',
      name: 'popup-settings',
      component: () => import('./views/SettingsView.vue'),
    },
  ],
})

export default router
