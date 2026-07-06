import type { AppSettings, AppTheme } from '@/utils/storage'

export interface GetSettingsMessage {
  type: 'getSettings'
}

export interface SaveSettingsMessage {
  type: 'saveSettings'
  payload: Partial<{
    theme: AppTheme
  }>
}

export interface IncrementCounterMessage {
  type: 'incrementCounter'
}

export type ExtensionMessage
  = | GetSettingsMessage
    | SaveSettingsMessage
    | IncrementCounterMessage

export type ExtensionMessageResponse<T extends ExtensionMessage['type']>
  = T extends 'getSettings'
    ? AppSettings
    : T extends 'saveSettings'
      ? AppSettings
      : T extends 'incrementCounter'
        ? AppSettings
        : never

/**
 * Send a typed message to the background and get a typed response.
 */
export async function sendExtensionMessage<T extends ExtensionMessage>(
  message: T,
): Promise<ExtensionMessageResponse<T['type']>> {
  return browser.runtime.sendMessage(message)
}
