import type { AppSettings, AppTheme } from '@/utils/storage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { appSettingsStorage, defaultAppSettings } from '@/utils/storage'

function normalizeSettings(settings?: Partial<AppSettings>): AppSettings {
  return {
    theme: settings?.theme ?? defaultAppSettings.theme,
    counter: settings?.counter ?? defaultAppSettings.counter,
  }
}

export const useAppStore = defineStore('app', () => {
  const theme = ref<AppTheme>(defaultAppSettings.theme)
  const counter = ref(defaultAppSettings.counter)
  const ready = ref(false)

  function applySettings(settings?: Partial<AppSettings>) {
    const normalized = normalizeSettings(settings)
    theme.value = normalized.theme
    counter.value = normalized.counter
  }

  async function persist(partial?: Partial<AppSettings>) {
    const next = normalizeSettings({
      theme: theme.value,
      counter: counter.value,
      ...partial,
    })

    applySettings(next)
    await appSettingsStorage.setValue(next)
    return next
  }

  async function init() {
    if (ready.value)
      return

    applySettings(await appSettingsStorage.getValue())
    appSettingsStorage.watch((value) => {
      applySettings(value)
    })
    ready.value = true
  }

  async function setTheme(value: AppTheme) {
    return persist({ theme: value })
  }

  async function incrementCounter() {
    return persist({ counter: counter.value + 1 })
  }

  async function resetCounter() {
    return persist({ counter: defaultAppSettings.counter })
  }

  async function resetAll() {
    return persist(defaultAppSettings)
  }

  const settings = computed<AppSettings>(() => ({
    theme: theme.value,
    counter: counter.value,
  }))

  return {
    counter,
    init,
    incrementCounter,
    ready,
    resetAll,
    resetCounter,
    setTheme,
    settings,
    theme,
  }
})
