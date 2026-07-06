import ContentFloatingWidget from '@/components/ContentFloatingWidget.vue'
import { createExtensionApp } from '@/lib/create-extension-app'
import { useAppStore } from '@/stores/app'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'wxt-vue-starter',
      position: 'inline',
      anchor: 'body',

      onMount(container) {
        const wrapper = document.createElement('div')
        wrapper.id = 'wxt-starter-shadow-wrapper'
        container.appendChild(wrapper)

        const { app, pinia } = createExtensionApp(ContentFloatingWidget)

        const appStore = useAppStore(pinia)
        void appStore.init()

        app.mount(wrapper)
        return app
      },

      onRemove(app) {
        app?.unmount()
      },
    })

    ui.mount()
  },
})
