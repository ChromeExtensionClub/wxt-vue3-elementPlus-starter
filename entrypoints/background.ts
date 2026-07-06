import type { ExtensionMessage } from '@/utils/messaging'
import { appSettingsStorage } from '@/utils/storage'

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      void appSettingsStorage.setValue({
        theme: 'system',
        counter: 0,
      })
    }
    else if (details.reason === 'update') {
      console.warn(`Extension updated from ${details.previousVersion ?? 'unknown version'}`)
    }
  })

  browser.runtime.onMessage.addListener(
    (message: ExtensionMessage, _sender, sendResponse) => {
      void (async () => {
        switch (message.type) {
          case 'getSettings': {
            const settings = await appSettingsStorage.getValue()
            sendResponse(settings ?? { theme: 'system', counter: 0 })
            break
          }
          case 'saveSettings': {
            const current = await appSettingsStorage.getValue()
            const next = {
              theme: current?.theme ?? 'system',
              counter: current?.counter ?? 0,
              ...message.payload,
            }

            await appSettingsStorage.setValue(next)
            sendResponse(next)
            break
          }
          case 'incrementCounter': {
            const current = await appSettingsStorage.getValue()
            const next = (current?.counter ?? 0) + 1
            const nextSettings = {
              theme: current?.theme ?? 'system',
              counter: next,
            }

            await appSettingsStorage.setValue(nextSettings)
            sendResponse(nextSettings)
            break
          }
        }
      })()
      return true
    },
  )
})
