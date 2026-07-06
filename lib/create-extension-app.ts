import type { Pinia } from 'pinia'
import type { Component } from 'vue'
import type { Router } from 'vue-router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { resolveElementPlusLocale } from '@/lib/element-plus'

interface CreateExtensionAppOptions {
  router?: Router
}

interface ExtensionAppContext {
  app: ReturnType<typeof createApp>
  pinia: Pinia
}

export function createExtensionApp(
  rootComponent: Component,
  options: CreateExtensionAppOptions = {},
): ExtensionAppContext {
  const app = createApp(rootComponent)
  const pinia = createPinia()

  app.use(pinia)
  app.use(ElementPlus, {
    locale: resolveElementPlusLocale(),
  })

  if (options.router)
    app.use(options.router)

  return { app, pinia }
}
