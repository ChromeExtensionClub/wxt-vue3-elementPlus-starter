import type { AppTheme } from '@/utils/storage'
import { usePreferredDark } from '@vueuse/core'
import { computed, watchEffect } from 'vue'
import { useAppStore } from '@/stores/app'

export function useDarkMode() {
  const appStore = useAppStore()
  const preferredDark = usePreferredDark()

  const isDark = computed(() => {
    return appStore.theme === 'system'
      ? preferredDark.value
      : appStore.theme === 'dark'
  })

  watchEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark.value)
    root.classList.toggle('light', !isDark.value)
  })

  async function setTheme(theme: AppTheme) {
    await appStore.setTheme(theme)
  }

  async function toggleDark() {
    await setTheme(isDark.value ? 'light' : 'dark')
  }

  return {
    isDark,
    setTheme,
    theme: computed(() => appStore.theme),
    toggleDark,
  }
}
