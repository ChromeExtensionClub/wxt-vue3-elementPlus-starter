import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'sidepanel-overview',
      component: () => import('./views/OverviewView.vue'),
    },
    {
      path: '/tools',
      name: 'sidepanel-tools',
      component: () => import('./views/ToolsView.vue'),
    },
  ],
})

export default router
