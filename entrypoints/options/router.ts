import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'options-general',
      component: () => import('./views/GeneralView.vue'),
    },
    {
      path: '/about',
      name: 'options-about',
      component: () => import('./views/AboutView.vue'),
    },
  ],
})

export default router
