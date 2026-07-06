import { createExtensionApp } from '@/lib/create-extension-app'
import { useAppStore } from '@/stores/app'
import App from './App.vue'
import router from './router'
import '@/assets/styles/global.scss'

async function bootstrap() {
  const { app, pinia } = createExtensionApp(App, { router })
  const appStore = useAppStore(pinia)

  await appStore.init()
  await router.isReady()

  app.mount('#app')
}

void bootstrap()
