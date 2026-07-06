import { storage } from '@wxt-dev/storage'

export type AppTheme = 'system' | 'light' | 'dark'

export interface AppSettings {
  theme: AppTheme
  counter: number
}

export const defaultAppSettings: AppSettings = {
  theme: 'system',
  counter: 0,
}

export const appSettingsStorage = storage.defineItem<AppSettings>('local:appSettings', {
  fallback: defaultAppSettings,
})
